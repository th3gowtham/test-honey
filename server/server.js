const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firebase Admin
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

const db = admin.firestore();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Raw body parser for webhook verification
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// JSON parser for other routes
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create Razorpay order
app.post('/api/payment/order', async (req, res) => {
  try {
    const { amount, name, email, courseName } = req.body;

    if (!amount || !name || !email || !courseName) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'amount, name, email, and courseName are required'
      });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        name,
        email,
        courseName
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      error: 'Failed to create order',
      details: error.message
    });
  }
});

// Webhook endpoint for Razorpay
app.post('/api/payment/webhook', async (req, res) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookBody = req.body;

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
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
      await updateEnrollmentStatus(orderId, paymentId);
    }

    res.status(200).json({ status: 'success' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Function to update enrollment status in Firestore
async function updateEnrollmentStatus(orderId, paymentId) {
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
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    console.log(`Updated ${snapshot.docs.length} enrollment(s) for order:`, orderId);

  } catch (error) {
    console.error('Error updating enrollment status:', error);
    throw error;
  }
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Payment server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
