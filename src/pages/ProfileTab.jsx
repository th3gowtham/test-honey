import { useState, useEffect, useRef } from "react";
import { User, Phone, MapPin, Camera, CheckCircle } from "lucide-react";
import "../styles/ProfileTab.css";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Firestore imports
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const ProfileTab = () => {
  const { userName, user, currentUser, userRole } = useAuth();
  const [profileData, setProfileData] = useState({
    phone: "",
    location: "",
    bio: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [avatarImage, setAvatarImage] = useState(null); // State for avatar image

  // NEW: File input ref and handlers for camera
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarImage(e.target.result);
          toast.success("Profile picture updated!");
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select a valid image file.");
      }
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.email) return;
      try {
        const profileRef = doc(db, "Students", user.email);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const data = profileSnap.data();
          setProfileData({
            phone: data.phone || "",
            location: data.location || "",
            bio: data.bio || "",
          });
        } else {
          setProfileData({ phone: "", location: "", bio: "" });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Only allow numbers and limit to 15 digits
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 15);
      setProfileData((prevData) => ({ ...prevData, [name]: numericValue }));
    } else {
      setProfileData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Validation function to check if required fields are filled
  const isFormValid = () => {
    return profileData.phone.trim() !== "" && profileData.location.trim() !== "";
  };

  const handleEdit = () => {
    setOriginalProfileData(profileData);
    setIsEditMode(true);
  };

  const handleSaveChanges = async () => {
    // Check if required fields are filled
    if (!isFormValid()) {
      toast.error("Please fill all required details (Phone and Location).");
      return;
    }

    try {
      const profileRef = doc(db, "Students", user.email);
      await setDoc(profileRef, {
        ...profileData
      }, { merge: true });
      toast.success("Profile updated successfully!");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setProfileData(originalProfileData);
    setIsEditMode(false);
  };

  return (
    <div className="profile-container">
      {/* Toast Message at the top */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* Validation message at the top when in edit mode */}
      {isEditMode && !isFormValid() && (
        <div className="validation-message-top">
          Please fill all required details
        </div>
      )}

      <div className="profile-overview">
        <div className="profile-avatar">
          {avatarImage ? (
            <img 
              src={avatarImage} 
              alt="Profile Avatar" 
              className="profile-avatar-image"
            />
          ) : (
            <span className="profile-avatar-initial">{userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
          )}
          <div
            className="profile-avatar-camera"
            style={{ cursor: "pointer" }}
            onClick={handleCameraClick}
            title="Change avatar"
          >
            <Camera size={22} color="#ffffff" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="profile-info">
          <h3 className="profile-name">{userName}</h3>
          <span className="profile-role">{userRole}</span>
          <p className="profile-description">Learner with access to enrolled batches</p>
        </div>
        <div className="w-full sm:w-auto sm:ml-auto">
          <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
        </div>
      </div>

      <div className="info-grid">
        <div>
          <label className="info-label">Full Name</label>
          <div className="info-box">
            <User size={16} color="#9ca3af" />
            <span className="info-text">{userName || 'User'}</span>
          </div>
        </div>
        <div>
          <label className="info-label">Email</label>
          <div className="info-box">
            <span className="info-text">{user?.email || 'No email available'}</span>
          </div>
        </div>
        <div>
          <label className="info-label">Phone</label>
          <div className="info-box">
            <Phone size={16} color="#9ca3af" />
            {isEditMode ? (
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                className="info-input"
                value={profileData.phone}
                onChange={handleInputChange}
                maxLength="15"
                pattern="[0-9]*"
                inputMode="numeric"
              />
            ) : (
              <span className="info-text">{profileData.phone || "Ex: 893834937"}</span>
            )}
          </div>
        </div>
        <div>
          <label className="info-label">Location</label>
          <div className="info-box">
            <MapPin size={16} color="#9ca3af" />
            {isEditMode ? (
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                className="info-input"
                value={profileData.location}
                onChange={handleInputChange}
              />
            ) : (
              <span className="info-text">{profileData.location || "Ex: United States"}</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="info-label">Bio</label>
        {isEditMode ? (
          <textarea
            name="bio"
            placeholder="Tell us about yourself..."
            className="bio-textarea"
            value={profileData.bio}
            onChange={handleInputChange}
          />
        ) : (
          <div className="info-box">
            <p className="info-text">{profileData.bio || "Tell us about yourself..."}</p>
          </div>
        )}
      </div>

      <div>
        <label className="info-label">Enrolled Batches</label>
        <div className="enrolled-batches">
          <span className="enrolled-tag">✓ math-101</span>
        </div>
      </div>

      {isEditMode && (
        <div className="action-buttons-container">
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button 
            className="save-button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
