"use client"

import { FiHome, FiBook, FiUsers, FiUserCheck, FiMessageCircle, FiLayers, FiCalendar, FiSettings } from "react-icons/fi"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "courses", label: "Courses Management", icon: FiBook },
  { id: "users", label: "User Management", icon: FiUsers },
  { id: "teachers", label: "Teacher Management", icon: FiUserCheck },
  { id: "chat-assignment", label: "One-on-One Chat", icon: FiMessageCircle },
  { id: "batch-assignment", label: "Batch Groups", icon: FiLayers },
  { id: "events", label: "Events Management", icon: FiCalendar },
  { id: "settings", label: "Settings", icon: FiSettings },
]

export default function Sidebar({ activeRoute, setActiveRoute, collapsed, setCollapsed }) {
  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">{!collapsed && <span>EduAdmin</span>}</div>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            🐝
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${activeRoute === item.id ? "active" : ""}`}
                onClick={() => setActiveRoute(item.id)}
                title={collapsed ? item.label : ""}
              >
                <Icon className="nav-icon" />
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 280px;
          background: white;
          border-right: 1px solid #e2e8f0;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
          transition: width 0.3s ease;
          z-index: 100;
          overflow: hidden;
        }
        
        .sidebar.collapsed {
          width: 80px;
        }
        
        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }
        
        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #127d8e;
        }
        
        .collapse-btn {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          color: #a0aec0;
          transition: all 0.2s ease;
        }
        
        .collapse-btn:hover {
          background-color: #f7fafc;
          color: #4a5568;
        }
        
        .sidebar-nav {
          padding: 16px 0;
        }
        
        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;
        }
        
        .nav-item:hover {
          background-color: #f7fafc;
          color: #2d3748;
        }
        
        .nav-item.active {
          background-color: #e6f7f9;
          color: #127d8e;
          border-right: 3px solid #127d8e;
        }
        
        .nav-icon {
          font-size: 20px;
          flex-shrink: 0;
        }
        
        .nav-label {
          white-space: nowrap;
          overflow: hidden;
        }
        
        .sidebar.collapsed .nav-item {
          justify-content: center;
          padding: 16px;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          
          .sidebar.mobile-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
