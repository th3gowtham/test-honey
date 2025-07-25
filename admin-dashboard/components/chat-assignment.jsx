"use client"

import { useState } from "react"
import { FiMessageCircle, FiTrash2, FiUser, FiUserCheck } from "react-icons/fi"

const mockStudents = [
  "Alice Johnson",
  "Bob Smith",
  "Carol Davis",
  "David Wilson",
  "Eva Brown",
  "Frank Miller",
  "Grace Lee",
  "Henry Taylor",
  "Ivy Chen",
  "Jack Robinson",
]

const mockTeachers = ["John Smith", "Sarah Johnson", "Mike Wilson", "Emily Davis", "David Brown"]

const mockAssignments = [
  { id: "A001", studentName: "Alice Johnson", teacherName: "John Smith", assignedDate: "2024-12-01", status: "active" },
  { id: "A002", studentName: "Bob Smith", teacherName: "Sarah Johnson", assignedDate: "2024-12-02", status: "active" },
  {
    id: "A003",
    studentName: "Carol Davis",
    teacherName: "Mike Wilson",
    assignedDate: "2024-12-03",
    status: "inactive",
  },
  { id: "A004", studentName: "David Wilson", teacherName: "Emily Davis", assignedDate: "2024-12-04", status: "active" },
]

export default function ChatAssignment() {
  const [assignments, setAssignments] = useState(mockAssignments)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")

  const handleAssign = () => {
    if (!selectedStudent || !selectedTeacher) {
      alert("Please select both a student and a teacher")
      return
    }

    // Check if assignment already exists
    const existingAssignment = assignments.find(
      (assignment) => assignment.studentName === selectedStudent && assignment.status === "active",
    )

    if (existingAssignment) {
      alert("This student is already assigned to a teacher")
      return
    }

    const newAssignment = {
      id: `A${String(assignments.length + 1).padStart(3, "0")}`,
      studentName: selectedStudent,
      teacherName: selectedTeacher,
      assignedDate: new Date().toISOString().split("T")[0],
      status: "active",
    }

    setAssignments([...assignments, newAssignment])
    setSelectedStudent("")
    setSelectedTeacher("")
  }

  const handleUnassign = (assignmentId) => {
    if (confirm("Are you sure you want to remove this assignment?")) {
      setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId))
    }
  }

  const toggleAssignmentStatus = (assignmentId) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, status: assignment.status === "active" ? "inactive" : "active" }
          : assignment,
      ),
    )
  }

  return (
    <div className="chat-assignment">
      <div className="page-header">
        <div>
          <h2>One-on-One Chat Assignment</h2>
          <p>Assign students to teachers for direct communication</p>
        </div>
      </div>

      <div className="assignment-form">
        <div className="form-card">
          <h3>Create New Assignment</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <FiUser /> Select Student
              </label>
              <select
                className="form-select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Choose a student...</option>
                {mockStudents.map((student) => (
                  <option key={student} value={student}>
                    {student}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiUserCheck /> Select Teacher
              </label>
              <select
                className="form-select"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                <option value="">Choose a teacher...</option>
                {mockTeachers.map((teacher) => (
                  <option key={teacher} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary assign-btn" onClick={handleAssign}>
              <FiMessageCircle /> Assign Chat
            </button>
          </div>
        </div>
      </div>

      <div className="assignments-section">
        <h3>Current Assignments</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Assignment ID</th>
                <th>Student</th>
                <th>Assigned Teacher</th>
                <th>Assigned Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.id}</td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar student">{assignment.studentName.charAt(0).toUpperCase()}</div>
                      <span>{assignment.studentName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar teacher">{assignment.teacherName.charAt(0).toUpperCase()}</div>
                      <span>{assignment.teacherName}</span>
                    </div>
                  </td>
                  <td>{new Date(assignment.assignedDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={`status-toggle ${assignment.status}`}
                      onClick={() => toggleAssignmentStatus(assignment.id)}
                    >
                      {assignment.status}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => handleUnassign(assignment.id)}
                      title="Remove Assignment"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .chat-assignment {
          max-width: 1400px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .page-header p {
          color: #718096;
          font-size: 16px;
        }

        .assignment-form {
          margin-bottom: 40px;
        }

        .form-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .form-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 24px;
          align-items: end;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4a5568;
        }

        .assign-btn {
          height: fit-content;
          white-space: nowrap;
        }

        .assignments-section h3 {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 24px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .user-avatar.student {
          background-color: #127d8e;
        }

        .user-avatar.teacher {
          background-color: #48bb78;
        }

        .status-toggle {
          padding: 6px 16px;
          border: none;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: capitalize;
        }

        .status-toggle.active {
          background-color: #c6f6d5;
          color: #22543d;
        }

        .status-toggle.inactive {
          background-color: #fed7d7;
          color: #742a2a;
        }

        .status-toggle:hover {
          opacity: 0.8;
        }

        .btn-icon {
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #f7fafc;
          color: #4a5568;
        }

        .btn-icon:hover {
          background-color: #e2e8f0;
        }

        .btn-icon.btn-danger {
          background-color: #fed7d7;
          color: #c53030;
        }

        .btn-icon.btn-danger:hover {
          background-color: #fbb6ce;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .page-header h2 {
            font-size: 24px;
          }

          .table-container {
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  )
}
