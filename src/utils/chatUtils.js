import { db } from '../services/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, serverTimestamp, query, orderBy, onSnapshot, where, writeBatch } from 'firebase/firestore';

/**
 * Generate a unique chat ID by combining two user IDs in ascending order
 * Optionally suffix by normalized course name for per-course chats
 * @param {string} userId1 - First user ID
 * @param {string} userId2 - Second user ID
 * @param {string} [courseName] - Optional course name
 * @returns {string} - Unique chat ID
 */
export const generateChatId = (userId1, userId2, courseName) => {
  const base = userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
  if (courseName) {
    const normalized = String(courseName).trim().toLowerCase().replace(/\s+/g, '-');
    return `${base}_${normalized}`;
  }
  return base;
};

/**
 * Create a new chat document if it doesn't exist
 * Adds admin to participants and sets course name as title when provided
 * @param {string} chatId - The chat ID
 * @param {string} userId1 - First user ID
 * @param {string} userId2 - Second user ID
 * @param {string} [courseName] - Optional course name for the chat
 */
export const createChatDocument = async (chatId, userId1, userId2, courseName = "") => {
  try {
    const chatDocRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatDocRef);
    const adminId = 'admin'; // change if your admin uid is different

    // Resolve possible uid/docId mismatches for Teacher and Students collections
    const resolveUserVariants = async (rawId) => {
      const variants = new Set([rawId]);
      // Teacher lookup
      try {
        const tByDoc = await getDoc(doc(db, 'Teacher', rawId));
        if (tByDoc.exists()) {
          const tuid = tByDoc.data()?.uid || tByDoc.id;
          variants.add(tuid);
        }
      } catch { /* noop */ }
      try {
        const tByUid = await getDocs(query(collection(db, 'Teacher'), where('uid', '==', rawId)));
        if (!tByUid.empty) {
          const d = tByUid.docs[0];
          variants.add(d.id);
          variants.add(d.data()?.uid || d.id);
        }
      } catch { /* noop */ }
      // Student lookup
      try {
        const sByDoc = await getDoc(doc(db, 'Students', rawId));
        if (sByDoc.exists()) {
          const suid = sByDoc.data()?.uid || sByDoc.id;
          variants.add(suid);
        }
      } catch { /* noop */ }
      try {
        const sByUid = await getDocs(query(collection(db, 'Students'), where('uid', '==', rawId)));
        if (!sByUid.empty) {
          const d = sByUid.docs[0];
          variants.add(d.id);
          variants.add(d.data()?.uid || d.id);
        }
      } catch { /* noop */ }
      return Array.from(variants);
    };

    const u1Variants = await resolveUserVariants(userId1);
    const u2Variants = await resolveUserVariants(userId2);
    const mergedUsers = Array.from(new Set([...u1Variants, ...u2Variants, adminId]));

    if (!chatDoc.exists()) {
      await setDoc(chatDocRef, {
        users: mergedUsers,
        name: courseName || undefined,
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: null,
        unreadCount: {},
        studentId: u1Variants[0],
        teacherId: u2Variants[0]
      });
    } else {
      const data = chatDoc.data() || {};
      const existingUsers = Array.isArray(data.users) ? data.users : [];
      const dedupUsers = Array.from(new Set([...existingUsers, ...mergedUsers]));
      await setDoc(chatDocRef, {
        users: dedupUsers,
        name: data.name || courseName || undefined,
        studentId: data.studentId || u1Variants[0],
        teacherId: data.teacherId || u2Variants[0]
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error creating chat document:', error);
  }
};

/**
 * Send a message to a chat
 * @param {string} chatId - The chat ID
 * @param {string} senderId - Sender's user ID
 * @param {string} receiverId - Receiver's user ID
 * @param {string} text - Message text
 */
export const sendMessage = async (chatId, senderId, receiverId, text) => {
  try {
    // Ensure chat document exists
    await createChatDocument(chatId, senderId, receiverId);
    
    // Add message to the messages subcollection
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      senderId,
      receiverId,
      text,
      timestamp: serverTimestamp(),
      read: false // Mark message as unread initially
    });
    
    // Update the chat document with last message info
    const chatDocRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatDocRef);
    
    // Get current unread count or initialize it
    let unreadCount = {};
    if (chatDoc.exists() && chatDoc.data().unreadCount) {
      unreadCount = { ...chatDoc.data().unreadCount };
    }
    
    // Increment unread count for receiver
    unreadCount[receiverId] = (unreadCount[receiverId] || 0) + 1;
    
    // Update chat document
    await setDoc(chatDocRef, {
      lastMessage: text,
      lastMessageTime: serverTimestamp(),
      lastSenderId: senderId,
      unreadCount: unreadCount
    }, { merge: true });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

/**
 * Subscribe to messages in a chat
 * @param {string} chatId - The chat ID
 * @param {function} callback - Callback function to handle messages
 * @param {string} currentUserId - Current user's ID to mark messages as read
 * @returns {function} - Unsubscribe function
 */
export const subscribeToMessages = (chatId, callback, currentUserId) => {
  try {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
    
    return onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() ? doc.data().timestamp.toDate().toISOString() : null
      }));
      
      // Mark messages as read if they were sent to the current user
      if (currentUserId) {
        markMessagesAsRead(chatId, currentUserId);
      }
      
      callback(messages);
    });
  } catch (error) {
    console.error('Error subscribing to messages:', error);
    return () => {}; // Return empty function in case of error
  }
};

/**
 * Get user chats with optional legacy teacher fallback (by email)
 * @param {string} userId - User ID
 * @param {function} callback - Callback function to handle chats
 * @param {string} [currentUserEmail] - Optional teacher email/Gmail for legacy fallback
 * @returns {function} - Unsubscribe function
 */
export const getUserChats = (userId, callback, currentUserEmail) => {
  try {
    const chatsRef = collection(db, 'chats');
    const all = new Map();

    const prepareStandard = async (docSnapshot) => {
      const chatData = docSnapshot.data();
      const participants = Array.isArray(chatData.users) ? chatData.users : [];
      const otherUserId = participants.find(id => id !== userId && id !== 'admin') || participants.find(id => id !== userId);
      let otherUserData = { displayName: 'Unknown User' };
      if (otherUserId) {
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        otherUserData = userDoc.exists() ? userDoc.data() : otherUserData;
      }
      const unreadCount = chatData.unreadCount && chatData.unreadCount[userId] ? chatData.unreadCount[userId] : 0;
      const usersAugmented = Array.isArray(chatData.users)
        ? Array.from(new Set([...
            chatData.users,
            userId,
            ...(userId === 'admin' ? ['admin'] : [])
          ]))
        : [userId, ...(userId === 'admin' ? ['admin'] : [])];
      return {
        id: docSnapshot.id,
        ...chatData,
        users: usersAugmented,
        title: chatData.name || otherUserData.displayName || 'Chat',
        otherUser: otherUserData,
        otherParticipantId: otherUserId,
        unreadCount
      };
    };

    // Primary subscription: where users contains current user
    const primaryQuery = query(chatsRef, where('users', 'array-contains', userId));
    const unsubscribers = [];

    const primaryUnsub = onSnapshot(primaryQuery, async (snapshot) => {
      // Remove previous standard entries before re-adding
      for (const [id, item] of Array.from(all.entries())) {
        if (Array.isArray(item.users)) all.delete(id);
      }
      for (const docSnapshot of snapshot.docs) {
        all.set(docSnapshot.id, await prepareStandard(docSnapshot));
      }
      callback(Array.from(all.values()));
    });
    unsubscribers.push(primaryUnsub);

    // Teacher fallback: find teacher doc and ensure chats exist + include additional variants
    const startTeacherFallback = async () => {
      // Try find by uid, then by email/Gmail
      const teacherCol = collection(db, 'Teacher');
      let teacherDocs = [];
      const byUid = await getDocs(query(teacherCol, where('uid', '==', userId)));
      if (!byUid.empty) teacherDocs = byUid.docs;
      if (teacherDocs.length === 0 && currentUserEmail) {
        const [byGmail, byEmail] = await Promise.all([
          getDocs(query(teacherCol, where('Gmail', '==', currentUserEmail))),
          getDocs(query(teacherCol, where('email', '==', currentUserEmail)))
        ]);
        teacherDocs = [...byGmail.docs, ...byEmail.docs];
      }
      if (teacherDocs.length === 0) return;

      const teacherDoc = teacherDocs[0];
      const teacherData = teacherDoc.data() || {};
      const teacherUid = teacherData.uid || teacherDoc.id;
      const teacherDocId = teacherDoc.id;

      // Backfill from chatAssignments to guarantee chat docs exist
      const ensureFromAssignments = (teacherIdentifier) => {
        const assignRef = collection(db, 'chatAssignments');
        const qa = query(assignRef, where('teacherId', '==', teacherIdentifier));
        const unsubA = onSnapshot(qa, async (snapshot) => {
          for (const d of snapshot.docs) {
            const a = d.data();
            if (!a.studentId) continue;
            const cid = generateChatId(a.studentId, teacherUid, a.course);
            await createChatDocument(cid, a.studentId, teacherUid, a.course || '');
          }
        });
        unsubscribers.push(unsubA);
      };
      ensureFromAssignments(teacherUid);
      if (teacherDocId !== teacherUid) ensureFromAssignments(teacherDocId);

      // Legacy chats with teacherId field
      const legacyQueries = [ query(chatsRef, where('teacherId', '==', teacherUid)) ];
      if (teacherDocId !== teacherUid) legacyQueries.push(query(chatsRef, where('teacherId', '==', teacherDocId)));
      for (const lq of legacyQueries) {
        const unsub = onSnapshot(lq, async (snapshot) => {
          for (const d of snapshot.docs) {
            const data = d.data();
            if (Array.isArray(data.users)) {
              // handled by primary, but still ensure admin visibility below
              const std = await prepareStandard(d);
              all.set(d.id, std);
              continue;
            }
            let otherUser = { displayName: 'Unknown User' };
            let otherId;
            if (data.studentId) {
              otherId = data.studentId;
              const sDoc = await getDoc(doc(db, 'Students', data.studentId));
              if (sDoc.exists()) {
                const sd = sDoc.data();
                otherUser = { displayName: sd.name || sd.displayName || 'Student', email: sd.Gmail || sd.email || '' };
              }
            }
            const unread = data.unreadCount && data.unreadCount[userId] ? data.unreadCount[userId] : 0;
            const usersForItem = Array.from(new Set([
              userId,
              otherId,
              ...(userId === 'admin' ? ['admin'] : [])
            ].filter(Boolean)));
            all.set(d.id, { id: d.id, ...data, users: usersForItem, title: data.name || otherUser.displayName || 'Chat', otherUser, otherParticipantId: otherId, unreadCount: unread });
          }
          callback(Array.from(all.values()));
        });
        unsubscribers.push(unsub);
      }

      // Chats where users mistakenly contains teacher doc id instead of auth uid
      if (teacherDocId && teacherDocId !== userId) {
        const usersContainsDocId = query(chatsRef, where('users', 'array-contains', teacherDocId));
        const unsub2 = onSnapshot(usersContainsDocId, async (snapshot) => {
          for (const d of snapshot.docs) {
            const item = await prepareStandard(d);
            all.set(d.id, item);
          }
          callback(Array.from(all.values()));
        });
        unsubscribers.push(unsub2);
      }
    };

    startTeacherFallback();

    // Determine if current user is an admin by checking users collection role
    const ensureAdminSubscription = async () => {
      let isAdmin = (userId === 'admin');
      try {
        const userSnap = await getDoc(doc(db, 'users', userId));
        if (userSnap.exists()) {
          const data = userSnap.data() || {};
          const roleLower = String(data.role || data.userRole || '').toLowerCase();
          if (roleLower === 'admin') isAdmin = true;
        }
      } catch { /* noop */ }
      // Additional fallbacks: dedicated admin collections
      const adminCollections = ['Admins', 'Admin', 'administrators', 'adminUsers'];
      try {
        for (const coll of adminCollections) {
          const byUid = await getDocs(query(collection(db, coll), where('uid', '==', userId)));
          const byEmail = currentUserEmail ? await getDocs(query(collection(db, coll), where('email', '==', currentUserEmail))) : { empty: true, docs: [] };
          if ((byUid && !byUid.empty) || (byEmail && !byEmail.empty)) { isAdmin = true; break; }
        }
      } catch { /* noop */ }

      if (isAdmin) {
        const unsubAll = onSnapshot(query(chatsRef), async (snapshot) => {
          for (const d of snapshot.docs) {
            all.set(d.id, await prepareStandard(d));
          }
          callback(Array.from(all.values()));
        });
        unsubscribers.push(unsubAll);
      }
    };

    ensureAdminSubscription();

    // Helper to resolve a teacher uid from an arbitrary identifier (uid or doc id)
    const resolveTeacherUid = async (teacherIdentifier) => {
      if (!teacherIdentifier) return null;
      try {
        // Try by doc id first
        const teacherDocRef = doc(db, 'Teacher', teacherIdentifier);
        const teacherDocSnap = await getDoc(teacherDocRef);
        if (teacherDocSnap.exists()) {
          const td = teacherDocSnap.data() || {};
          return td.uid || teacherDocSnap.id;
        }
      } catch { /* noop */ }
      try {
        // Try by uid
        const qByUid = query(collection(db, 'Teacher'), where('uid', '==', teacherIdentifier));
        const snap = await getDocs(qByUid);
        if (!snap.empty) {
          const d = snap.docs[0];
          const td = d.data() || {};
          return td.uid || d.id;
        }
      } catch { /* noop */ }
      return teacherIdentifier; // fallback
    };

    const resolveStudentVariants = async (studentUid, email) => {
      const variants = new Set([studentUid]);
      try {
        // by uid -> get doc id
        const qByUid = query(collection(db, 'Students'), where('uid', '==', studentUid));
        const qs = await getDocs(qByUid);
        if (!qs.empty) {
          variants.add(qs.docs[0].id);
        }
      } catch { /* noop */ }
      if (email) {
        try {
          // sometimes Students doc id is lowercased email
          const ref = doc(db, 'Students', String(email).toLowerCase());
          const snap = await getDoc(ref);
          if (snap.exists()) variants.add(snap.id);
        } catch { /* noop */ }
      }
      return Array.from(variants);
    };

    // Student backfill: ensure chats exist for assignments where this user is the student
    const startStudentBackfill = async () => {
      const studentVariants = await resolveStudentVariants(userId, currentUserEmail);
      const subs = [];
      for (const studentIdVariant of studentVariants) {
        // Subscribe to assignments to ensure chat docs exist
        const qa = query(collection(db, 'chatAssignments'), where('studentId', '==', studentIdVariant));
        const unsubAssign = onSnapshot(qa, async (snapshot) => {
          for (const d of snapshot.docs) {
            const a = d.data();
            const teacherUid = await resolveTeacherUid(a.teacherId);
            if (!teacherUid || !a.studentId) continue;
            const cid = generateChatId(a.studentId, teacherUid, a.course);
            await createChatDocument(cid, a.studentId, teacherUid, a.course || '');
          }
        });
        subs.push(unsubAssign);

        // Subscribe to chats where users contains any student id variant
        const qc = query(chatsRef, where('users', 'array-contains', studentIdVariant));
        const unsubChats = onSnapshot(qc, async (snapshot) => {
          for (const d of snapshot.docs) {
            all.set(d.id, await prepareStandard(d));
          }
          callback(Array.from(all.values()));
        });
        subs.push(unsubChats);
      }
      unsubscribers.push(...subs);
    };

    // Admin backfill: ensure all assignment chats exist
    const startAdminBackfill = async () => {
      if (userId !== 'admin') return;
      const qa = query(collection(db, 'chatAssignments'));
      const unsub = onSnapshot(qa, async (snapshot) => {
        for (const d of snapshot.docs) {
          const a = d.data();
          const teacherUid = await resolveTeacherUid(a.teacherId);
          if (!teacherUid || !a.studentId) continue;
          const cid = generateChatId(a.studentId, teacherUid, a.course);
          await createChatDocument(cid, a.studentId, teacherUid, a.course || '');
        }
      });
      unsubscribers.push(unsub);
    };

    startStudentBackfill();
    startAdminBackfill();

    return () => {
      unsubscribers.forEach(u => { try { u && u() } catch { /* noop */ } });
    };
  } catch (error) {
    console.error('Error getting user chats:', error);
    return () => {};
  }
};

/**
 * Mark all messages in a chat as read for a specific user
 * @param {string} chatId - The chat ID
 * @param {string} userId - User ID who is reading the messages
 */
export const markMessagesAsRead = async (chatId, userId) => {
  try {
    // Get all unread messages sent to this user
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const unreadMessagesQuery = query(
      messagesRef, 
      where('receiverId', '==', userId),
      where('read', '==', false)
    );
    
    const unreadSnapshot = await getDocs(unreadMessagesQuery);
    
    if (unreadSnapshot.empty) return; // No unread messages
    
    // Use a batch to update all messages at once
    const batch = writeBatch(db);
    
    unreadSnapshot.docs.forEach(doc => {
      batch.update(doc.ref, { read: true });
    });
    
    // Reset unread counter for this user in the chat document
    const chatDocRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatDocRef);
    
    if (chatDoc.exists()) {
      const chatData = chatDoc.data();
      const unreadCount = { ...(chatData.unreadCount || {}) };
      
      // Reset unread count for this user
      if (unreadCount && unreadCount[userId]) {
        unreadCount[userId] = 0;
        batch.update(chatDocRef, { unreadCount });
      }
    }
    
    // Commit all updates
    await batch.commit();
    
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};