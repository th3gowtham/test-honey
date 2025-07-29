// Import Firebase Admin SDK configuration
// This gives us access to Firebase Authentication and Firestore database
const { auth, db } = require('../config/firebaseAdmin');  

// At the top, add bcrypt for password hashing
const bcrypt = require('bcryptjs');

// Helper: assign role (reuse your logic)
// This helper function now correctly checks for Admins and Teachers
// and returns the name stored in the database for them.
async function getUserRoleAndName(email, nameFromToken) {
  email = email.trim().toLowerCase();
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
    const email = decoded.email.trim().toLowerCase();
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

// Teacher password setup endpoint
const setTeacherPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const lowerEmail = email.trim().toLowerCase();
  try {
    // Check if email is in Teacher collection
    const teacherSnap = await db.collection('Teacher').where('Gmail', '==', lowerEmail).get();
    if (teacherSnap.empty) {
      return res.status(403).json({ error: 'Access denied: Not a teacher' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the teacher document with the hashed password
    const teacherDocId = teacherSnap.docs[0].id;
    await db.collection('Teacher').doc(teacherDocId).update({ password: hashedPassword });

    res.json({ message: 'Password set successfully' });
  } catch (err) {
    console.error("[setTeacherPassword] Error:", err);
    res.status(500).json({ error: 'Failed to set password' });
  }
};

// Teacher login endpoint
const teacherLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const lowerEmail = email.trim().toLowerCase();
  try {
    // Check if email is in Teacher collection
    const teacherSnap = await db.collection('Teacher').where('Gmail', '==', lowerEmail).get();
    if (teacherSnap.empty) {
      return res.status(403).json({ error: 'Access denied: Not a teacher' });
    }

    const teacherData = teacherSnap.docs[0].data();
    if (!teacherData.password) {
      return res.status(403).json({ error: 'Password not set. Please set your password first.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, teacherData.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // You can generate a session/token here if needed
    res.json({ message: 'Login successful', role: 'Teacher', name: teacherData.name });
  } catch (err) {
    console.error("[teacherLogin] Error:", err);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = (req, res) => {
  res.clearCookie('session', { path: '/' });
  res.json({ message: 'Logged out' });
};

// Check if teacher exists endpoint
const teacherExists = async (req, res) => {
  const email = (req.query.email || '').trim().toLowerCase();
  console.log('[teacherExists] Received email:', email);
  if (!email) return res.status(400).json({ exists: false });
  try {
    console.log('[teacherExists] Querying Teacher collection for Gmail ==', email);
    const teacherSnap = await db.collection('Teacher').where('Gmail', '==', email).get();
    console.log('[teacherExists] Query result empty:', teacherSnap.empty, 'Count:', teacherSnap.size);
    if (!teacherSnap.empty) {
      console.log('[teacherExists] Teacher found for email:', email);
      return res.json({ exists: true });
    } else {
      console.log('[teacherExists] Teacher NOT found for email:', email);
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error('[teacherExists] Error:', err);
    return res.status(500).json({ exists: false });
  }
};

module.exports = { handleGoogleLogin, logout, getUserRoleAndName, handleEmailRegister, setTeacherPassword, teacherLogin, teacherExists };

