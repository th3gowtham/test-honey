# TheHoneyBee - Real-time Enrollment System

A web application built with React, Firebase, and Razorpay that allows students to browse and purchase courses with real-time enrollment tracking for administrators.

## Features

- **Course Catalog**: Browse and view available courses
- **Real-time Enrollment**: Purchase courses with Razorpay payment integration
- **Admin Dashboard**: Monitor enrollments in real-time without page refresh
- **Enrollment Management**: Filter, search, and update enrollment statuses

## Technology Stack

- **Frontend**: React.js with hooks and context API
- **Backend**: Firebase (Authentication, Firestore)
- **Payment Processing**: Razorpay (Test Mode)

## Setup Instructions

### 1. Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google sign-in methods
3. Create a Firestore database
4. Add the following collections:
   - `courses`: Regular course offerings
   - `advancedCourses`: Premium course offerings
   - `enrollments`: Student course purchases
5. Update the Firebase configuration in `src/firebase.config.js` with your project credentials

### 2. Firestore Security Rules

Copy the following rules to your Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read all documents
    match /{document=**} {
      allow read: if true;
    }
    
    // Only allow authenticated admins to write to courses and advancedCourses
    match /courses/{courseId} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /advancedCourses/{courseId} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Allow authenticated users to create enrollments
    // Allow users to update their own enrollments or admins to update any
    // Only allow admins to delete enrollments
    match /enrollments/{enrollmentId} {
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                     (request.auth.uid == resource.data.userId || request.auth.token.admin == true);
      allow delete: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 3. Razorpay Setup

1. Create a Razorpay account at [https://razorpay.com/](https://razorpay.com/)
2. Get your API Key and Secret from the Razorpay Dashboard
3. Set up your backend environment variables for Razorpay integration
4. For testing, use Razorpay's test mode with the following test card:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3-digit number
   - OTP: 1234

## Project Structure

```
/src
  /admin
    /components
      enrollments-management.jsx  # Admin view for enrollment management
  /components
    RazorpayCheckout.jsx         # Reusable payment component
  /context
    PaymentContext.jsx           # Context for payment processing
  /pages
    Classes.jsx                  # Course listing and enrollment page
  /services
    firebase.js                  # Firebase initialization
    enrollmentService.js         # Enrollment management functions
  /styles
    EnrollmentManagement.css     # Styles for enrollment management
/backend
  /routes
    payment.js                   # API routes for Razorpay integration
  /services
    razorpay.js                  # Razorpay configuration
```

## Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Start the backend server:
   ```
   npm run server
   ```

## Enrollment Flow

1. Student browses courses on the `/classes` page
2. Student clicks "Enroll Now" on a course
3. System creates a Firestore document with "Pending" status
4. Razorpay payment modal opens
5. Upon successful payment, the enrollment status updates to "Paid"
6. Admin can view the enrollment in real-time on the `/admin` page

## Admin Features

- **Real-time Updates**: See new enrollments instantly without refreshing
- **Filtering**: Filter enrollments by status (Paid, Pending, Failed, Refunded)
- **Search**: Search enrollments by student name or course title
- **Status Management**: Update enrollment status manually if needed

## License

MIT