// Import Firebase Admin SDK configuration
// This gives us access to Firebase Authentication and Firestore database
const { auth, db } = require('../config/firebaseAdmin');  

// Helper: assign role (reuse your logic)
async function getUserRoleAndName(email, name) {
  // ... your admin/teacher/student logic here ...
  // (copy from your existing code, but return {role, name})
  // Example:
  const adminSnapshot = await db.collection('Admin').where('Gmail', '==', email).get();
  if (!adminSnapshot.empty) return { role: 'Admin', name };
  const teacherSnapshot = await db.collection('Teacher').where('Gmail', '==', email).get();
  if (!teacherSnapshot.empty) return { role: 'Teacher', name };
  const studentRef = db.collection('Students').doc(email);
  const studentSnap = await studentRef.get();
  if (!studentSnap.exists) {
    await studentRef.set({ Gmail: email, name, createdAt: new Date() });
  }
  return { role: 'Student', name };
}

// Main function that handles Google login authentication
// This function receives a Google ID token from the frontend and verifies it
// Then it checks what role the user has in our system (Admin, Teacher, or Student)
const handleGoogleLogin = async (req, res) => {
  const { idToken, rememberMe } = req.body;
  try {
    const decoded = await auth.verifyIdToken(idToken);
    const email = decoded.email.toLowerCase();
    const name = decoded.name;
    const { role } = await getUserRoleAndName(email, name);

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

    // Optionally, store role/name in DB or session if you want to return them in /me
    res.json({ role, name });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const logout = (req, res) => {
  res.clearCookie('session', { path: '/' });
  res.json({ message: 'Logged out' });
};

module.exports = { handleGoogleLogin, logout };

