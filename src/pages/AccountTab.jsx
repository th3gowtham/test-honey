import { Shield } from "lucide-react";

const AccountTab = () => {
  function Signout() {
    alert("You are signed out");
  }

  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Account Info Section */}
      <div>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Shield size={20} style={{ marginRight: "0.5rem", flexShrink: 0 }} />
          Account Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Account Type
            </label>
            <p
              style={{
                color: "#111827",
                fontWeight: "500",
                fontSize: "0.875rem",
              }}
            >
              Student
            </p>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Member Since
            </label>
            <p
              style={{
                color: "#111827",
                fontSize: "0.875rem",
              }}
            >
              January 2024
            </p>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Last Login
            </label>
            <p
              style={{
                color: "#111827",
                fontSize: "0.875rem",
              }}
            >
              Today, 2:30 PM
            </p>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Status
            </label>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.5rem",
                fontSize: "0.75rem",
                backgroundColor: "#d1fae5",
                color: "#065f46",
                borderRadius: "0.375rem",
              }}
            >
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1.5rem",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#dc2626",
            marginBottom: "0.5rem",
          }}
        >
          Danger Zone
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "1rem",
          }}
        >
          These actions cannot be undone
        </p>

        <button
          onClick={Signout}
          style={{
            width: "100%",
            padding: "0.5rem 1rem",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#fee2e2";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#fef2f2";
          }}
        >
          <span
            style={{
              marginRight: "0.5rem",
              fontSize: "1rem",
            }}
          >
            ▷
          </span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountTab;
