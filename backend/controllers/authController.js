// Import Firebase Admin SDK configuration
// This gives us access to Firebase Authentication and Firestore database
const { auth, db } = require('../config/firebaseAdmin');  

// Helper: assign role (reuse your logic)
async function getUserRoleAndName(email, name) {
  // Log the email and name being checked
  console.log("[getUserRoleAndName] Checking role for:", email, name);

  const adminSnapshot = await db.collection('Admin').where('Gmail', '==', email).get();
  if (!adminSnapshot.empty) {
    console.log("[getUserRoleAndName] User is Admin:", email);
    return { role: 'Admin', name };
  }
  const teacherSnapshot = await db.collection('Teacher').where('Gmail', '==', email).get();
  if (!teacherSnapshot.empty) {
    console.log("[getUserRoleAndName] User is Teacher:", email);
    return { role: 'Teacher', name };
  }
  const studentRef = db.collection('Students').doc(email);
  const studentSnap = await studentRef.get();
  if (!studentSnap.exists) {
    console.log("[getUserRoleAndName] Creating new Student:", email);
    await studentRef.set({ Gmail: email, name, createdAt: new Date() });
  }
  console.log("[getUserRoleAndName] User is Student:", email);
  return { role: 'Student', name };
}

// Main function that handles Google login authentication
const handleGoogleLogin = async (req, res) => {
  const { idToken, rememberMe } = req.body;
  try {
    // Decode the ID token
    const decoded = await auth.verifyIdToken(idToken);
    const email = decoded.email.toLowerCase();
    const name = decoded.name;

    // Log the decoded user info
    console.log("[handleGoogleLogin] Decoded user:", { email, name, uid: decoded.uid });

    // Get the user's role and name
    const { role } = await getUserRoleAndName(email, name);

    // Log the role being returned
    console.log("[handleGoogleLogin] Returning role to frontend:", role, "for user:", email);

    // Create session cookie
    const expiresIn = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    // Set cookie
    res.cookie('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in prod
      sameSite: 'lax',
      path: '/',
    });

    // Return role and name to frontend
    res.json({ role, name });
  } catch (err) {
    console.error("[handleGoogleLogin] Error during login:", err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

const logout = (req, res) => {
  res.clearCookie('session', { path: '/' });
  res.json({ message: 'Logged out' });
};

module.exports = { handleGoogleLogin, logout, getUserRoleAndName };

