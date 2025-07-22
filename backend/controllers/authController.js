// Import Firebase Admin SDK configuration
// This gives us access to Firebase Authentication and Firestore database
const { auth, db } = require('../config/firebaseAdmin');  

// Helper: assign role (reuse your logic)
// This helper function now correctly checks for Admins and Teachers
// and returns the name stored in the database for them.
async function getUserRoleAndName(email, nameFromToken) {
  // 1. Check for Admin
  const adminSnapshot = await db.collection('Admin').where('Gmail', '==', email).get();
  if (!adminSnapshot.empty) {
    const adminData = adminSnapshot.docs[0].data();
    // Use the name from the Admin record in the database
    const dbName = adminData.name || email.split('@')[0]; // Fallback if name is missing in DB
    console.log(`[getUserRoleAndName] Found Admin. Email: ${email}, Name from DB: ${dbName}`);
    return { role: 'Admin', name: dbName };
  }

  // 2. Check for Teacher
  const teacherSnapshot = await db.collection('Teacher').where('Gmail', '==', email).get();
  if (!teacherSnapshot.empty) {
    const teacherData = teacherSnapshot.docs[0].data();
    
    const dbName = teacherData.name || email.split('@')[0];
    console.log(`[getUserRoleAndName] Found Teacher. Email: ${email}, Name from DB: ${dbName}`);
    return { role: 'Teacher', name: dbName };
  }

  // 3. Handle Student (existing or new)
  const studentRef = db.collection('Students').doc(email);
  const studentSnap = await studentRef.get();

  if (studentSnap.exists) {
    // For existing students, use their name from the database
    const studentData = studentSnap.data();
    const dbName = studentData.name || email.split('@')[0];
    console.log(`[getUserRoleAndName] Found existing Student. Email: ${email}, Name from DB: ${dbName}`);
    return { role: 'Student', name: dbName };
  } else {
    // For NEW students, use the name from the token (e.g., from Google or registration form)
    const newStudentName = nameFromToken || email.split('@')[0];
    console.log(`[getUserRoleAndName] Creating new Student. Email: ${email}, Name: ${newStudentName}`);
    await studentRef.set({ Gmail: email, name: newStudentName, createdAt: new Date() });
    return { role: 'Student', name: newStudentName };
  }
}

// Helper: check if email exists in any collection
async function emailExistsInAnyCollection(email) {
  const adminSnap = await db.collection('Admin').where('Gmail', '==', email).get();
  if (!adminSnap.empty) return true;
  const teacherSnap = await db.collection('Teacher').where('Gmail', '==', email).get();
  if (!teacherSnap.empty) return true;
  const studentSnap = await db.collection('Students').doc(email).get();
  if (studentSnap.exists) return true;
  return false;
}

// Registration endpoint (for email/password)
const handleEmailRegister = async (req, res) => {
  const { email, name } = req.body;
  try {
    const userEmail = email.toLowerCase();
    // Check if email exists in any collection
    if (await emailExistsInAnyCollection(userEmail)) {
      return res.status(400).json({ error: 'Email already exists in the system' });
    }
    // At this point, Firebase Auth user is already created on frontend
    // Create Student record in Firestore
    await db.collection('Students').doc(userEmail).set({
      Gmail: userEmail,
      name,
      createdAt: new Date()
    });
    // Assign role
    const { role } = await getUserRoleAndName(userEmail, name);
    res.json({ role, name });
  } catch (err) {
    console.error("[handleEmailRegister] Error:", err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Main function that handles Google login authentication
const handleGoogleLogin = async (req, res) => {
  const { idToken, rememberMe } = req.body;
  try {
    const decoded = await auth.verifyIdToken(idToken);
    const email = decoded.email.toLowerCase();
    // Pass the name from the token to the helper function.
    // It will only be used if a NEW student is being created.
    const nameFromToken = decoded.name || decoded.displayName;

    // This now returns the role and the CORRECT name (from DB for existing users)
    const { role, name } = await getUserRoleAndName(email, nameFromToken);

    const expiresIn = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    res.cookie('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    // Return the final role and name to the frontend
    res.json({ role, name });
  } catch (err) {
    console.error("[handleGoogleLogin] Error verifying ID token:", err);
    res.status(401).json({
      error: 'Invalid token. Verification failed.',
      details: err.message
    });
  }
};

const logout = (req, res) => {
  res.clearCookie('session', { path: '/' });
  res.json({ message: 'Logged out' });
};

module.exports = { handleGoogleLogin, logout, getUserRoleAndName, handleEmailRegister };

