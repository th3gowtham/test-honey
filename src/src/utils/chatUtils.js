import { db } from '../services/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  where,
  writeBatch
} from 'firebase/firestore'

// Generate chat id from two user ids; optionally include course for per-course chats
export const generateChatId = (userId1, userId2, courseName) => {
  const base = userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`
  if (courseName) {
    const normalized = String(courseName).trim().toLowerCase().replace(/\s+/g, '-')
    return `${base}_${normalized}`
  }
  return base
}

// Create a chat document if not exists; add admin and set name to course
export const createChatDocument = async (chatId, studentId, teacherId, courseName = '') => {
  try {
    const chatRef = doc(db, 'chats', chatId)
    const snap = await getDoc(chatRef)
    const adminId = 'admin' // update if your admin uid differs
    if (!snap.exists()) {
      await setDoc(chatRef, {
        users: [studentId, teacherId, adminId],
        name: courseName || undefined,
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: null,
        unreadCount: {}
      })
    } else {
      // Ensure admin is present and name is set (merge)
      const data = snap.data() || {}
      const mergedUsers = Array.isArray(data.users)
        ? Array.from(new Set([...data.users, adminId]))
        : [studentId, teacherId, adminId]
      await setDoc(
        chatRef,
        { users: mergedUsers, name: data.name || courseName || undefined },
        { merge: true }
      )
    }
  } catch (err) {
    console.error('Error creating chat document:', err)
  }
}

// Send a message and update lastMessage/unread counters
export const sendMessage = async (chatId, senderId, receiverId, text) => {
  try {
    await createChatDocument(chatId, senderId, receiverId)
    const messagesRef = collection(db, 'chats', chatId, 'messages')
    await addDoc(messagesRef, {
      senderId,
      receiverId,
      text,
      timestamp: serverTimestamp(),
      read: false
    })

    const chatRef = doc(db, 'chats', chatId)
    const snap = await getDoc(chatRef)
    const unreadCount = (snap.exists() && snap.data().unreadCount) ? { ...snap.data().unreadCount } : {}
    unreadCount[receiverId] = (unreadCount[receiverId] || 0) + 1

    await setDoc(
      chatRef,
      {
        lastMessage: text,
        lastMessageTime: serverTimestamp(),
        lastSenderId: senderId,
        unreadCount
      },
      { merge: true }
    )
  } catch (err) {
    console.error('Error sending message:', err)
  }
}

// Subscribe to messages ordered by timestamp; mark as read for current user
export const subscribeToMessages = (chatId, callback, currentUserId) => {
  try {
    const messagesRef = collection(db, 'chats', chatId, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'))
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(d => ({ id: d.id, ...d.data(),
        timestamp: d.data().timestamp?.toDate?.() ? d.data().timestamp.toDate().toISOString() : null
      }))
      if (currentUserId) {
        markMessagesAsRead(chatId, currentUserId)
      }
      callback(messages)
    })
  } catch (err) {
    console.error('Error subscribing to messages:', err)
    return () => {}
  }
}

// Build user chat list with legacy teacherId fallback and teacher doc id miswrites
export const getUserChats = (userId, callback, currentUserEmail) => {
  try {
    const chatsRef = collection(db, 'chats')
    const all = new Map()

    const prepareStandard = async (docSnap) => {
      const data = docSnap.data()
      const adminSet = new Set(['admin'])
      const participants = Array.isArray(data.users) ? data.users : []
      const otherId = participants.find(id => id !== userId && !adminSet.has(id)) || participants.find(id => id !== userId)
      let otherUser = { displayName: 'Unknown User' }
      if (otherId) {
        const u = await getDoc(doc(db, 'users', otherId))
        if (u.exists()) otherUser = u.data()
      }
      const unread = data.unreadCount && data.unreadCount[userId] ? data.unreadCount[userId] : 0
      return { id: docSnap.id, ...data, title: data.name || otherUser.displayName || 'Chat', otherParticipantId: otherId, otherUser, unreadCount: unread }
    }

    const primary = query(chatsRef, where('users', 'array-contains', userId))
    const unsubPrimary = onSnapshot(primary, async (snapshot) => {
      all.clear()
      for (const d of snapshot.docs) {
        all.set(d.id, await prepareStandard(d))
      }
      callback(Array.from(all.values()))
    })

    const unsubscribers = [unsubPrimary]

    const startTeacherFallback = async () => {
      // Find teacher doc by uid first, else by email/Gmail
      const teachersCol = collection(db, 'Teacher')
      let teacherDocs = []
      const byUid = await getDocs(query(teachersCol, where('uid', '==', userId)))
      if (!byUid.empty) teacherDocs = byUid.docs
      if (teacherDocs.length === 0 && currentUserEmail) {
        const [byGmail, byEmail] = await Promise.all([
          getDocs(query(teachersCol, where('Gmail', '==', currentUserEmail))),
          getDocs(query(teachersCol, where('email', '==', currentUserEmail)))
        ])
        teacherDocs = [...byGmail.docs, ...byEmail.docs]
      }
      if (teacherDocs.length === 0) return

      const teacherDoc = teacherDocs[0]
      const teacherData = teacherDoc.data() || {}
      const teacherUid = teacherData.uid || teacherDoc.id
      const teacherDocId = teacherDoc.id

      // Legacy chats: teacherId stored
      const legacyQueries = [
        query(chatsRef, where('teacherId', '==', teacherUid))
      ]
      if (teacherDocId !== teacherUid) legacyQueries.push(query(chatsRef, where('teacherId', '==', teacherDocId)))

      for (const ql of legacyQueries) {
        const unsub = onSnapshot(ql, async (snapshot) => {
          for (const d of snapshot.docs) {
            const data = d.data()
            if (Array.isArray(data.users)) continue
            // Treat student as other participant if present
            let otherUser = { displayName: 'Unknown User' }
            let otherId
            if (data.studentId) {
              otherId = data.studentId
              const sDoc = await getDoc(doc(db, 'Students', data.studentId))
              if (sDoc.exists()) {
                const sd = sDoc.data()
                otherUser = { displayName: sd.name || sd.displayName || 'Student', email: sd.Gmail || sd.email || '' }
              }
            }
            const unread = data.unreadCount && data.unreadCount[userId] ? data.unreadCount[userId] : 0
            all.set(d.id, { id: d.id, ...data, title: data.name || otherUser.displayName || 'Chat', otherParticipantId: otherId, otherUser, unreadCount: unread })
          }
          callback(Array.from(all.values()))
        })
        unsubscribers.push(unsub)
      }

      // Chats where users mistakenly contains teacher doc id
      if (teacherDocId && teacherDocId !== userId) {
        const qUsersDocId = query(chatsRef, where('users', 'array-contains', teacherDocId))
        const unsubUsersDocId = onSnapshot(qUsersDocId, async (snapshot) => {
          for (const d of snapshot.docs) {
            all.set(d.id, await prepareStandard(d))
          }
          callback(Array.from(all.values()))
        })
        unsubscribers.push(unsubUsersDocId)
      }

      // Backfill from chatAssignments to ensure chats exist
      const ensureFromAssignments = (teacherIdentifier) => {
        const assignRef = collection(db, 'chatAssignments')
        const qa = query(assignRef, where('teacherId', '==', teacherIdentifier))
        const unsubA = onSnapshot(qa, async (snapshot) => {
          for (const d of snapshot.docs) {
            const a = d.data()
            if (!a.studentId) continue
            const cid = generateChatId(a.studentId, teacherUid, a.course)
            await createChatDocument(cid, a.studentId, teacherUid, a.course || '')
          }
        })
        unsubscribers.push(unsubA)
      }
      ensureFromAssignments(teacherUid)
      if (teacherDocId !== teacherUid) ensureFromAssignments(teacherDocId)
    }

    startTeacherFallback()

    return () => unsubscribers.forEach((u) => {
      try { u && u() } catch {}
    })
  } catch (err) {
    console.error('Error getting user chats:', err)
    return () => {}
  }
}

// Mark all messages to current user as read and reset unread counter
export const markMessagesAsRead = async (chatId, userId) => {
  try {
    const msgsRef = collection(db, 'chats', chatId, 'messages')
    const qUnread = query(msgsRef, where('receiverId', '==', userId), where('read', '==', false))
    const snap = await getDocs(qUnread)
    if (snap.empty) return

    const batch = writeBatch(db)
    snap.docs.forEach((d) => batch.update(d.ref, { read: true }))

    const chatRef = doc(db, 'chats', chatId)
    const chatSnap = await getDoc(chatRef)
    if (chatSnap.exists()) {
      const data = chatSnap.data()
      const unread = { ...(data.unreadCount || {}) }
      if (unread[userId]) unread[userId] = 0
      batch.update(chatRef, { unreadCount: unread })
    }

    await batch.commit()
  } catch (err) {
    console.error('Error marking messages read:', err)
  }
}
