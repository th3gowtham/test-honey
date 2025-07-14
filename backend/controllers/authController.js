// Import Firebase Admin SDK configuration
// This gives us access to Firebase Authentication and Firestore database
const { auth, db } = require('../config/firebaseAdmin');  

// Main function that handles Google login authentication
// This function receives a Google ID token from the frontend and verifies it
// Then it checks what role the user has in our system (Admin, Teacher, or Student)
const handleGoogleLogin = async (req, res) => {
  // Extract the Google ID token from the request body
  // This token was obtained from Google's authentication service
  const { idToken } = req.body;

  try {
    // Verify the Google ID token with Firebase
    // This ensures the token is valid and not fake
    const decoded = await auth.verifyIdToken(idToken);
    console.log(idToken)  // for debug , it can be deleted later
    
    // Extract user information from the decoded token
    // Convert email to lowercase to avoid case-sensitivity issues
    const email = decoded.email.toLowerCase(); 
    const name = decoded.name;

    // First, check if this user is an Admin
    // We search the Admin collection in Firestore for a document with matching email
    const adminSnapshot = await db.collection('Admin')        
                                  .where('Gmail', '==', email)
                                  .get();
    
    // If we found an admin with this email, return admin role
    if (!adminSnapshot.empty) {
      // Send back admin role and name to the frontend
      return res.json({ role: 'Admin', name });
    }

    // If not an admin, check if this user is a Teacher
    // Search the Teacher collection for matching email
    const teacherSnapshot = await db.collection('Teacher')
                                    .where('Gmail', '==', email)
                                    .get();
    
    // If we found a teacher with this email, return teacher role
    if (!teacherSnapshot.empty) {
      // Send back teacher role and name to the frontend
      return res.json({ role: 'Teacher', name });
    } 

    // If not admin or teacher, this user is a Student
    // We use the email as the document ID for easy lookup
    const studentRef = db.collection('Students').doc(email);
    const studentSnap = await studentRef.get();

    // Check if this student already exists in our database
    if (!studentSnap.exists) {
      // If student doesn't exist, create a new student record
      // This automatically registers new users as students
      await studentRef.set({
        Gmail: email, 
        name,
        createdAt: new Date() // Track when this student was created
      });
    } 

    // Return student role and name to the frontend
    // All users who aren't admin or teacher are treated as students
    return res.json({ role: 'Student', name });

  } catch (err) {
    // If anything goes wrong (invalid token, database error, etc.)
    // Return an error response with 401 status code
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Export the function so it can be used in routes
module.exports = { handleGoogleLogin };

