import { User, Phone, MapPin, Camera, Save } from "lucide-react";
import { FaBook } from "react-icons/fa6";
import "../styles/ProfileTab.css";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebaseprofile.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

const PROFILE_USER_ID = "profile-demo-site-1";

const ProfileTab = ({ onProfileUpdate, onEditStateChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");
  const [saveFlash, setSaveFlash] = useState(false);

  const userData = {
    name: "John Doe",
    email: "john@honeybee.com",
    phone: "",
    location: "",
    bio: "",
  };

  const [form, setForm] = useState(userData);
  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "users", PROFILE_USER_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm({ ...userData, ...docSnap.data() });
      }
    } catch (err) {
      toast.error("Failed to load profile data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    async function testConnection() {
      try {
        await setDoc(doc(db, "test", "connection"), {
          success: true,
          timestamp: Date.now(),
        });
        console.log("✅ Firestore write succeeded!");
      } catch (err) {
        console.error("❌ Firestore write failed:", err);
      }
    }
    testConnection();
  }, []);

  const isDirty = () =>
    form.name !== userData.name ||
    form.email !== userData.email ||
    form.phone !== userData.phone ||
    form.location !== userData.location ||
    form.bio !== userData.bio;

  useEffect(() => {
    if (onEditStateChange) onEditStateChange(editMode, editMode && isDirty());
  }, [editMode, form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      setEmailWarning(value && !emailPattern.test(value) ? "Please enter a valid email address" : "");
    }

    if (name === "phone") {
      setPhoneWarning(value && !/^\d*$/.test(value) ? "Phone number should contain only numbers" : "");
    }
  };

  const handleSave = async () => {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address");
      setTimeout(() => setError(""), 2500);
      return;
    }

    try {
      await setDoc(doc(db, "users", PROFILE_USER_ID), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        bio: form.bio,
      }, { merge: true });

      setEditMode(false);
      setError("");
      if (onProfileUpdate) onProfileUpdate();
      toast.success("Profile updated successfully!", {
        duration: 2000,
        style: {
          background: "#14b8a6",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
        },
      });
    } catch (err) {
      toast.error("Failed to update profile!", {
        duration: 2000,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
        },
      });
      console.error(err);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="profile-card-container">
      {/* Profile Overview */}
      <div className="profile-overview">
        <div className="profile-avatar">
          <span className="profile-avatar-initial">{form.name ? form.name[0].toUpperCase() : "J"}</span>
          <div className="profile-avatar-camera" onClick={handleCameraClick} style={{ cursor: "pointer" }}>
            <Camera size={20} color="#ffffff" />
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={() => {}} />
          </div>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{form.name || "John Doe"}</h3>
          <span className="profile-role">
            <FaBook style={{ color: "#2563eb", marginRight: "0.3em", verticalAlign: "middle" }} size={12} />
            Student
          </span>
          <p className="profile-description">Learner with access to enrolled batches</p>
        </div>
        <div className="profile-edit-btn-container">
          {editMode ? (
            <button className="edit-button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          ) : (
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {error && (
        <div style={{
          position: "absolute",
          top: "-2.2rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "320px",
          background: "#ef4444",
          color: "white",
          padding: "0.5rem 0",
          textAlign: "center",
          fontWeight: 500,
          fontSize: "0.95rem",
          borderRadius: "0.5rem",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>
          {error}
        </div>
      )}

      {/* Info Grid */}
      <div className="info-grid">
        <div>
          <label className="info-label">Full Name</label>
          <div className="info-box">
            <User size={16} color="#9ca3af" />
            <input type="text" name="name" className="info-input" value={form.name} onChange={handleChange} placeholder="John Doe" disabled={!editMode} />
          </div>
        </div>
        <div>
          <label className="info-label">Email</label>
          <div className="info-box">
            <span style={{ marginRight: "0.3em" }}>@</span>
            <input type="email" name="email" className="info-input" value={form.email} onChange={handleChange} placeholder="john@honeybee.com" disabled={!editMode} />
          </div>
        </div>
        <div>
          <label className="info-label">Phone</label>
          <div className="info-box">
            <Phone size={16} color="#9ca3af" />
            <input type="text" name="phone" className="info-input" placeholder="Enter phone number" value={form.phone} onChange={handleChange} disabled={!editMode} />
          </div>
        </div>
        <div>
          <label className="info-label">Location</label>
          <div className="info-box">
            <MapPin size={16} color="#9ca3af" />
            <input type="text" name="location" className="info-input" placeholder="Enter location" value={form.location} onChange={handleChange} disabled={!editMode} />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="info-label">Bio</label>
        <textarea name="bio" placeholder="Tell us about yourself..." className="bio-textarea" value={form.bio} onChange={handleChange} disabled={!editMode} />
      </div>

      {/* Enrolled Batches */}
      <div>
        <label className="info-label">Enrolled Batches</label>
        <div className="enrolled-batches">
          <span className="enrolled-tag">✓ math-101</span>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {editMode && (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
          <button
            className={`save-button${saveFlash ? " save-button-flash" : ""}`}
            style={{
              width: "auto",
              minWidth: "120px",
              backgroundColor: "#059669", // green-600
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
              fontWeight: 600,
              fontSize: "1rem",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.6rem 1.5rem"
            }}
            onClick={() => {
              if (!isDirty()) {
                toast.error("No changes to save!", {
                  duration: 2000,
                  style: {
                    background: "#ef4444",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "1rem",
                  },
                });
                return;
              }
              handleSave();
            }}
            disabled={!!emailWarning || !!phoneWarning || !isDirty()}
          >
            <Save size={20} style={{ marginRight: "0.5em" }} />
            Save Changes
          </button>
          <button className="cancel-button" style={{ width: "auto", minWidth: "120px" }} onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
