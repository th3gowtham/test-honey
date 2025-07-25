import { db } from '../services/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, serverTimestamp, query, orderBy, onSnapshot, where, updateDoc, increment, writeBatch } from 'firebase/firestore';

/**
 * Generate a unique chat ID by combining two user IDs in ascending order
 * @param {string} userId1 - First user ID
 * @param {string} userId2 - Second user ID
 * @returns {string} - Unique chat ID
 */
export const generateChatId = (userId1, userId2) => {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
};

/**
 * Create a new chat document if it doesn't exist
 * @param {string} chatId - The chat ID
 * @param {string} userId1 - First user ID
 * @param {string} userId2 - Second user ID
 */
export const createChatDocument = async (chatId, userId1, userId2) => {
  try {
    const chatDocRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatDocRef);
    
    if (!chatDoc.exists()) {
      // Create the chat document with user IDs
      await setDoc(chatDocRef, {
        users: [userId1, userId2],
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: null
      });
      console.log(`Chat document created with ID: ${chatId}`);
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
        timestamp: doc.data().timestamp?.toDate().toISOString() || new Date().toISOString()
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
 * Get user chats
 * @param {string} userId - User ID
 * @param {function} callback - Callback function to handle chats
 * @returns {function} - Unsubscribe function
 */
export const getUserChats = (userId, callback) => {
  try {
    const chatsRef = collection(db, 'chats');
    const chatsQuery = query(chatsRef, where('users', 'array-contains', userId));
    
    return onSnapshot(chatsQuery, async (snapshot) => {
      const chats = [];
      
      for (const docSnapshot of snapshot.docs) {
        const chatData = docSnapshot.data();
        const otherUserId = chatData.users.find(id => id !== userId);
        
        // Get other user's info
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        const userData = userDoc.exists() ? userDoc.data() : { displayName: 'Unknown User' };
        
        // Get unread count for current user
        const unreadCount = chatData.unreadCount && chatData.unreadCount[userId] ? chatData.unreadCount[userId] : 0;
        
        chats.push({
          id: docSnapshot.id,
          ...chatData,
          otherUser: userData,
          unreadCount: unreadCount
        });
      }
      
      callback(chats);
    });
  } catch (error) {
    console.error('Error getting user chats:', error);
    return () => {}; // Return empty function in case of error
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
      const unreadCount = { ...chatData.unreadCount };
      
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