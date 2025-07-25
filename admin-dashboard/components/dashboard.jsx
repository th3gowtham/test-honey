"use client"

import { FiUsers, FiUserCheck, FiBook, FiLayers, FiTrendingUp, FiCalendar, FiClock, FiArrowRight } from "react-icons/fi"

const analyticsData = [
  { title: "Total Students", value: "2,847", icon: FiUsers, color: "#127d8e", change: "+12%" },
  { title: "Total Teachers", value: "156", icon: FiUserCheck, color: "#48bb78", change: "+5%" },
  { title: "Total Courses", value: "89", icon: FiBook, color: "#ed8936", change: "+8%" },
  { title: "Active Batches", value: "34", icon: FiLayers, color: "#9f7aea", change: "+3%" },
]

const recentActivities = [
  { action: "New student enrolled", course: "React Fundamentals", time: "2 hours ago" },
  { action: "Course completed", course: "JavaScript Basics", time: "4 hours ago" },
  { action: "New teacher added", course: "Python Development", time: "6 hours ago" },
  { action: "Batch created", course: "Web Design", time: "1 day ago" },
  { action: "Event scheduled", course: "Tech Workshop", time: "2 days ago" },
]

const upcomingEvents = [
  { title: "React Workshop", date: "Dec 25, 2024", time: "10:00 AM", participants: 45 },
  { title: "Python Bootcamp", date: "Dec 28, 2024", time: "2:00 PM", participants: 32 },
  { title: "Design Thinking Session", date: "Jan 2, 2025", time: "11:00 AM", participants: 28 },
]

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening with your platform today.</p>
      </div>

      <div className="analytics-grid">
        {analyticsData.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="analytics-card">
              <div className="card-header">
                <div className="card-icon" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  <Icon />
                </div>
                <div className="card-change">
                  <FiTrendingUp />
                  {item.change}
                </div>
              </div>
              <div className="card-content">
                <h3>{item.value}</h3>
                <p>{item.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="dashboard-content">
        <div className="activities-section">
          <div className="section-header">
            <h3>Recent Activities</h3>
            <button className="view-all-btn">
              View All <FiArrowRight />
            </button>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-course">{activity.course}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="events-section">
          <div className="section-header">
            <h3>Upcoming Events</h3>
            <button className="view-all-btn">
              View All <FiArrowRight />
            </button>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-date">
                  <FiCalendar />
                  <span>{event.date}</span>
                </div>
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <div className="event-meta">
                    <span className="event-time">
                      <FiClock /> {event.time}
                    </span>
                    <span className="event-participants">
                      <FiUsers /> {event.participants} participants
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 1400px;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .dashboard-header p {
          color: #718096;
          font-size: 16px;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .analytics-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .analytics-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .card-change {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #48bb78;
          font-size: 14px;
          font-weight: 500;
        }

        .card-content h3 {
          font-size: 36px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .card-content p {
          color: #718096;
          font-size: 14px;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
        }

        .view-all-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #4299e1;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .view-all-btn:hover {
          color: #3182ce;
        }

        .activities-section,
        .events-section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f7fafc;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          background-color: #127d8e;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-action {
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .activity-course {
          color: #718096;
          font-size: 14px;
        }

        .activity-time {
          color: #a0aec0;
          font-size: 12px;
          white-space: nowrap;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .event-item {
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: border-color 0.2s ease;
        }

        .event-item:hover {
          border-color: #4299e1;
        }

        .event-date {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #127d8e;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .event-details h4 {
          color: #2d3748;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .event-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #718096;
        }

        .event-time,
        .event-participants {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .dashboard-header h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  )
}
