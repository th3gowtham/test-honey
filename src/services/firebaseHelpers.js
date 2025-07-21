// src/services/firebaseHelpers.js
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Firestore document path
const PROFILE_USER_ID = "profile-demo-site-1";
const USER_COLLECTION = "users";

export const saveUserProfile = async (profileData) => {
  try {
    const docRef = doc(db, USER_COLLECTION, PROFILE_USER_ID);
    await setDoc(docRef, profileData);
    console.log("✅ Profile data saved successfully");
  } catch (error) {
    console.error("❌ Error saving profile data:", error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const docRef = doc(db, USER_COLLECTION, PROFILE_USER_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("✅ Fetched user profile:", docSnap.data());
      return docSnap.data();
    } else {
      console.warn("⚠️ No profile data found");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching profile data:", error);
    throw error;
  }
};
