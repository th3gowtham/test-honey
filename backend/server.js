// Import required packages for our backend server
// Express is a web framework that makes it easy to create APIs
const express = require('express');
// CORS allows our frontend (running on a different port) to communicate with this backend
const cors = require('cors');
// Import our authentication routes - these handle login/logout requests
const authRoutes = require('./routes/auth');


const app = express();// Create an Express application instance , This is like creating a new web server
// Define which port our server will run on
// Port 5000 is commonly used for backend development servers
const PORT = 5000;

// Configure CORS (Cross-Origin Resource Sharing)
// This is a security feature that controls which websites can access our API
app.use(cors({
  origin: 'http://localhost:5173',  // Depends on the env. we running , we can change port later
  credentials: true  // Allow cookies and authentication headers to be sent
}));


app.use(express.json()); // Middleware to parse JSON data from incoming requests ,This allows our server to understand JSON data sent from the frontend

// Set up our authentication routes
// Any request that starts with '/api/auth' will be handled by our auth routes
// For example: POST /api/auth/google-login will go to our login handler
app.use('/api/auth', authRoutes);

// Start the server and listen for incoming requests
// This makes our server actually run and wait for connections
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

