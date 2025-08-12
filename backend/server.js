const express = require('express');
require('dotenv').config();
const cors = require('cors');
const Razorpay = require('razorpay');
const path = require('path');
const crypto = require('crypto');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/mongodb');
const { db, admin } = require('./config/firebaseAdmin');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Raw body parser for webhook verification (must be before express.json())
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Razorpay Setup (use env to ensure the same secret is used for order creation and verification)
const mask = (val = '') => (typeof val === 'string' && val.length > 8 ? `${val.slice(0,6)}...${val.slice(-4)}` : val ? '***' : '');
console.log('Razorpay env:', {
  keyId: mask(process.env.RAZORPAY_KEY_ID),
  secretSet: Boolean(process.env.RAZORPAY_SECRET || process.env.RAZORPAY_KEY_SECRET)
});
const razorpay = new Razorpay({
// CORS Configuration
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET || process.env.RAZORPAY_KEY_SECRET,
});

// Payment: Create Order
app.post('/api/payment/order', async (req, res) => {
  try {
    const { amount, name, email, courseName } = req.body || {};

    // Validate Razorpay config
    if (!process.env.RAZORPAY_KEY_ID || !(process.env.RAZORPAY_SECRET || process.env.RAZORPAY_KEY_SECRET)) {
      return res.status(500).json({ error: 'Payment gateway not configured. Missing RAZORPAY_KEY_ID or RAZORPAY_SECRET' });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedCourseName = typeof courseName === 'string' ? courseName.trim() : '';
    if (!trimmedName || !trimmedEmail || !trimmedCourseName) {
      return res.status(400).json({ error: 'Missing required fields', details: 'name, email, courseName are required' });
    }

    console.log('Creating order:', { amount: numericAmount, name: trimmedName, email: trimmedEmail, courseName: trimmedCourseName });

    const options = {
      amount: Math.round(numericAmount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { name: trimmedName, email: trimmedEmail, courseName: trimmedCourseName }
    };

    const order = await razorpay.orders.create(options);

    console.log('Order created successfully:', order.id);
    
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpay.key_id
    });
  } catch (error) {
    // Try to surface Razorpay SDK error description if present
    const razorpayDetail =
      (error && error.error && (error.error.description || error.error.reason)) ||
      (error && error.response && error.response.data && (error.response.data.description || error.response.data.error)) ||
      error.message;
    console.error('Error creating order:', razorpayDetail, error);
    res.status(500).json({ error: 'Error creating order', details: razorpayDetail });
  }
});

// Payment: Verify
app.post('/api/payment/verify', async (req, res) => {
  try {
    const {
      courseId,
      userId,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    } = req.body || {};

    if (!courseId || !userId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        error:
          'Missing required fields: courseId, userId, razorpay_order_id, razorpay_payment_id, razorpay_signature',
      });
    }

    const secret = process.env.RAZORPAY_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, error: 'Server misconfiguration: RAZORPAY_SECRET not set' });
    }

    // Normalize and strictly verify signature for string `${orderId}|${paymentId}`
    const normalizedOrderId = String(razorpayOrderId).trim();
    const normalizedPaymentId = String(razorpayPaymentId).trim();
    const normalizedSignature = String(razorpaySignature).trim().toLowerCase();

    const payload = `${normalizedOrderId}|${normalizedPaymentId}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex').toLowerCase();

    const provided = Buffer.from(normalizedSignature, 'hex');
    const expected = Buffer.from(expectedSignature, 'hex');
    if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
      return res.status(400).json({ success: false, error: 'Signature mismatch: verification failed' });
    }

    // Query pending enrollment
    const pendingSnap = await db
      .collection('enrollments')
      .where('courseId', '==', courseId)
      .where('userId', '==', userId)
      .where('paymentStatus', '==', 'Pending')
      .get();

    if (pendingSnap.empty) {
      // If already paid, treat as success to keep idempotency
      const paidSnap = await db
        .collection('enrollments')
        .where('courseId', '==', courseId)
        .where('userId', '==', userId)
        .where('paymentStatus', '==', 'Paid')
        .limit(1)
        .get();

      if (!paidSnap.empty) {
        return res.status(200).json({
          success: true,
          message: 'Payment already verified and enrollment marked as Paid',
          updatedEnrollmentIds: [paidSnap.docs[0].id],
        });
      }

      return res.status(404).json({ success: false, error: 'Pending enrollment not found for given courseId and userId' });
    }

    const batch = db.batch();
    const updatedIds = [];
    pendingSnap.docs.forEach((doc) => {
      batch.update(doc.ref, {
        paymentStatus: 'Paid',
        paymentId: razorpayPaymentId,
        paymentOrderId: razorpayOrderId,
        paymentVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      updatedIds.push(doc.id);
    });

    await batch.commit();

    return res.status(200).json({
      success: true,
      message: 'Payment verified and enrollment updated',
      updatedEnrollmentIds: updatedIds,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ success: false, error: 'Payment verification failed', details: error.message });
  }
});

// Webhook endpoint for Razorpay
app.post('/api/payment/webhook', async (req, res) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookBody = req.body;

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(webhookBody)
      .digest('hex');

    if (webhookSignature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(webhookBody.toString());
    console.log('Webhook event received:', event.event);

    // Handle payment.captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;
      const paymentId = payment.id;

      console.log('Payment captured:', { orderId, paymentId });

      // Find and update enrollment in Firestore
      await updateEnrollmentStatusWebhook(orderId, paymentId);
    }

    res.status(200).json({ status: 'success' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Function to update enrollment status via webhook
async function updateEnrollmentStatusWebhook(orderId, paymentId) {
  try {
    // Query enrollments collection for pending payments with matching order ID
    const enrollmentsRef = db.collection('enrollments');
    const query = enrollmentsRef.where('paymentOrderId', '==', orderId)
                                .where('paymentStatus', '==', 'Pending');

    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log('No pending enrollment found for order:', orderId);
      return;
    }

    // Update all matching enrollments (should typically be just one)
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, {
        paymentStatus: 'Paid',
        paymentId: paymentId,
        paymentVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    console.log(`Updated ${snapshot.docs.length} enrollment(s) for order:`, orderId);

  } catch (error) {
    console.error('Error updating enrollment status via webhook:', error);
    throw error;
  }
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start Server
app.listen(PORT, () => {
  const serverUrl = process.env.NODE_ENV === 'production' 
    ? 'Production server running' 
    : `Server running on http://localhost:${PORT}`;
  console.log(serverUrl);
});