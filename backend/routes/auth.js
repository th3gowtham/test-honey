// Import Express framework to create our routes
// Routes are like "addresses" that tell the server where to send different types of requests
const express = require('express');

// Import our authentication controller functions
// Controllers contain the actual logic for handling requests (like login processing)
const { handleGoogleLogin } = require('../controllers/authController');

// Create a router instance
// A router is like a traffic director - it takes incoming requests and sends them to the right handler
const router = express.Router();

// Define our authentication routes
// This creates a POST endpoint at '/google-login'
// When someone sends a POST request to '/api/auth/google-login', it will call the handleGoogleLogin function
router.post('/google-login', handleGoogleLogin);

// Export the router so it can be used in our main server file
// This connects our routes to the main Express application
module.exports = router;
