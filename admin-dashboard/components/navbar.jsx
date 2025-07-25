"use client"

import { FiBell, FiUser, FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi"
import { useState } from "react"

export default function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="page-title">Admin Dashboard</h1>
        </div>

        <div className="navbar-right">
          <button className="notification-btn">
            <FiBell />
            <span className="notification-badge">3</span>
          </button>

          <div className="profile-dropdown">
            <button className="profile-btn" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <div className="profile-avatar">
                <FiUser />
              </div>
              <span className="profile-name">Admin User</span>
              <FiChevronDown className={`dropdown-arrow ${showProfileDropdown ? "open" : ""}`} />
            </button>

            {showProfileDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item">
                  <FiSettings />
                  Profile Settings
                </button>
                <button className="dropdown-item">
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          height: 80px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
        }
        
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .notification-btn {
          position: relative;
          background: none;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          color: #4a5568;
          transition: all 0.2s ease;
        }
        
        .notification-btn:hover {
          background-color: #f7fafc;
        }
        
        .notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: #127d8e;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
        }
        
        .profile-dropdown {
          position: relative;
        }
        
        .profile-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .profile-btn:hover {
          background-color: #f7fafc;
        }
        
        .profile-avatar {
          width: 40px;
          height: 40px;
          background-color: #127d8e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .profile-name {
          font-weight: 500;
          color: #2d3748;
        }
        
        .dropdown-arrow {
          transition: transform 0.2s ease;
        }
        
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 200px;
          padding: 8px 0;
          margin-top: 8px;
          z-index: 100;
        }
        
        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s ease;
          color: #4a5568;
        }
        
        .dropdown-item:hover {
          background-color: #f7fafc;
        }
        
        @media (max-width: 768px) {
          .navbar {
            padding: 0 16px;
          }
          
          .page-title {
            font-size: 20px;
          }
          
          .profile-name {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
