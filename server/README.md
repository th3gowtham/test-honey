# The Honey Bee Payment Server

A secure Node.js Express server for handling Razorpay payments with webhook verification and Firebase integration.

## Features

- ✅ Razorpay order creation
- ✅ Secure webhook verification
- ✅ Firebase Firestore integration
- ✅ Automatic payment status updates
- ✅ CORS configuration
- ✅ Environment-based configuration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

- `RAZORPAY_KEY_ID`: Your Razorpay Key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret  
- `RAZORPAY_WEBHOOK_SECRET`: Your Razorpay Webhook Secret
- `FIREBASE_PROJECT_ID`: Your Firebase Project ID
- `FIREBASE_PRIVATE_KEY`: Your Firebase Service Account Private Key
- `FIREBASE_CLIENT_EMAIL`: Your Firebase Service Account Email
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Your frontend URL for CORS

### 3. Firebase Service Account

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate a new private key
3. Use the credentials in your `.env` file

### 4. Razorpay Webhook Configuration

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Select events: `payment.captured`
4. Copy the webhook secret to your `.env` file

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### POST /api/payment/order
Creates a new Razorpay order.

**Request Body:**
```json
{
  "amount": 1000,
  "name": "John Doe",
  "email": "john@example.com",
  "courseName": "React Course"
}
```

**Response:**
```json
{
  "orderId": "order_xyz123",
  "keyId": "rzp_test_xyz",
  "amount": 100000,
  "currency": "INR"
}
```

### POST /api/payment/webhook
Handles Razorpay webhook events for payment verification.

**Headers:**
- `x-razorpay-signature`: Webhook signature for verification

## Security Features

- Webhook signature verification
- CORS protection
- Environment-based configuration
- Input validation
- Error handling

## Deployment

1. Set up your server on a cloud platform
2. Configure environment variables
3. Set up SSL certificate
4. Update Razorpay webhook URL
5. Update frontend API URL

## Troubleshooting

### Common Issues

1. **Webhook signature verification fails**
   - Check webhook secret in environment variables
   - Ensure webhook URL is correct in Razorpay dashboard

2. **Firebase connection issues**
   - Verify service account credentials
   - Check Firebase project ID
   - Ensure Firestore is enabled

3. **CORS errors**
   - Update `FRONTEND_URL` in environment variables
   - Check frontend API URL configuration
