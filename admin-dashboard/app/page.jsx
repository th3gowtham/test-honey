"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import Dashboard from "@/components/dashboard"
import CoursesManagement from "@/components/courses-management"
import UserManagement from "@/components/user-management"
import TeacherManagement from "@/components/teacher-management"
import ChatAssignment from "@/components/chat-assignment"
import BatchAssignment from "@/components/batch-assignment"
import EventsManagement from "@/components/events-management"
import Settings from "@/components/settings"
import "./globals.css"

export default function AdminDashboard() {
  const [activeRoute, setActiveRoute] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeRoute) {
      case "dashboard":
        return <Dashboard />
      case "courses":
        return <CoursesManagement />
      case "users":
        return <UserManagement />
      case "teachers":
        return <TeacherManagement />
      case "chat-assignment":
        return <ChatAssignment />
      case "batch-assignment":
        return <BatchAssignment />
      case "events":
        return <EventsManagement />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="admin-dashboard">
      <Sidebar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Navbar />
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  )
}
