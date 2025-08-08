const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// =================================================================
// START: UPDATED CORS CONFIGURATION
// =================================================================

// List of websites that are allowed to connect to your backend
const allowedOrigins = [
  'https://thehoneybee.netlify.app', // Your live website
  'http://localhost:5173'           // Your local computer for development
];

const corsOptions = {
  origin: function (origin, callback) {
    // This function checks if the incoming request origin is in our allowed list.
    // If it is, `callback(null, true)` tells the cors middleware to send back an
    // Access-Control-Allow-Origin header with that specific origin, which is what the browser needs.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// =================================================================
// END: UPDATED CORS CONFIGURATION
// =================================================================


// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Razorpay Setup , replace 
const razorpay = new Razorpay({
  key_id: 'rzp_test_veVuTj6cfOddyD',
  key_secret: 'SglcJjO6LLvOQSjbyjFyGPoy'
});

// Payment: Create Order
app.post('/api/payment/order', async (req, res) => {
  try {
    const { amount, name, email, courseName } = req.body;
    
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { name, email, courseName }
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpay.key_id
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order', details: error.message });
  }
});

// Payment: Verify
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification details' });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', razorpay.key_secret)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed', details: error.message });
  }
});

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