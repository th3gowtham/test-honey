"use client"

import { useState, useEffect } from "react"
import { FiMessageCircle, FiTrash2, FiUser, FiUserCheck, FiAlertCircle } from "react-icons/fi"
import { db } from "../../services/firebase"
import { collection, onSnapshot, query, doc, deleteDoc, addDoc, serverTimestamp, where } from "firebase/firestore"

export default function ChatAssignment() {
  const [assignments, setAssignments] = useState([])
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [loading, setLoading] = useState({
    students: true,
    teachers: true,
    assignments: true
  })
  const [error, setError] = useState({
    students: null,
    teachers: null,
    assignments: null
  })
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  // Fetch students from Firestore
  useEffect(() => {
    setLoading(prev => ({ ...prev, students: true }))
    setError(prev => ({ ...prev, students: null }))

    // Create a query against the Students collection
    const studentsRef = collection(db, "Students")
    const q = query(studentsRef)

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const studentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          uid: doc.data().uid || doc.id,
          name: doc.data().name || "Unknown",
          email: doc.data().Gmail || doc.data().email || "",
          status: doc.data().status || "active"
        }))
        setStudents(studentsData.filter(student => student.status === "active"))
        setLoading(prev => ({ ...prev, students: false }))
      },
      (err) => {
        console.error("Error fetching students:", err)
        setError(prev => ({ ...prev, students: "Failed to load student data" }))
        setLoading(prev => ({ ...prev, students: false }))
      }
    )

    // Clean up listener on unmount
    return () => unsubscribe()
  }, [])

  // Fetch teachers from Firestore
  useEffect(() => {
    setLoading(prev => ({ ...prev, teachers: true }))
    setError(prev => ({ ...prev, teachers: null }))

    // Create a query against the Teachers collection
    const teachersRef = collection(db, "Teacher")
    const q = query(teachersRef)

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const teachersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          uid: doc.data().uid || doc.id,
          name: doc.data().name || "Unknown",
          email: doc.data().Gmail || doc.data().email || "",
          status: doc.data().status || "active"
        }))
        setTeachers(teachersData.filter(teacher => teacher.status === "active"))
        setLoading(prev => ({ ...prev, teachers: false }))
      },
      (err) => {
        console.error("Error fetching teachers:", err)
        setError(prev => ({ ...prev, teachers: "Failed to load teacher data" }))
        setLoading(prev => ({ ...prev, teachers: false }))
      }
    )

    // Clean up listener on unmount
    return () => unsubscribe()
  }, [])

  // Fetch chat assignments from Firestore
  useEffect(() => {
    setLoading(prev => ({ ...prev, assignments: true }))
    setError(prev => ({ ...prev, assignments: null }))

    // Create a query against the chatAssignments collection
    const assignmentsRef = collection(db, "chatAssignments")
    const q = query(assignmentsRef)

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const assignmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          assignmentId: doc.data().assignmentId || doc.id,
          studentId: doc.data().studentId || "",
          teacherId: doc.data().teacherId || "",
          assignedDate: doc.data().assignedAt ? 
            new Date(doc.data().assignedAt.toDate()).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
          status: doc.data().status || "active",
          // These will be populated later
          studentName: "",
          teacherName: ""
        }))
        
        // Resolve student and teacher names
        const resolvedAssignments = assignmentsData.map(assignment => {
          const student = students.find(s => s.uid === assignment.studentId || s.id === assignment.studentId)
          const teacher = teachers.find(t => t.uid === assignment.teacherId || t.id === assignment.teacherId)
          
          return {
            ...assignment,
            studentName: student ? student.name : "Unknown Student",
            teacherName: teacher ? teacher.name : "Unknown Teacher"
          }
        })
        
        setAssignments(resolvedAssignments)
        setLoading(prev => ({ ...prev, assignments: false }))
      },
      (err) => {
        console.error("Error fetching assignments:", err)
        setError(prev => ({ ...prev, assignments: "Failed to load assignment data" }))
        setLoading(prev => ({ ...prev, assignments: false }))
      }
    )

    // Clean up listener on unmount
    return () => unsubscribe()
  }, [students, teachers])

  const handleAssign = async () => {
    if (!selectedStudent || !selectedTeacher) {
      showToast("Please select both a student and a teacher", "error")
      return
    }

    try {
      // Check if assignment already exists
      const existingAssignment = assignments.find(
        (assignment) => 
          assignment.studentId === selectedStudent && 
          assignment.teacherId === selectedTeacher && 
          assignment.status === "active"
      )

      if (existingAssignment) {
        showToast("This student-teacher pair is already assigned", "error")
        return
      }

      // Generate a new assignment ID
      const assignmentId = `A${String(assignments.length + 1).padStart(3, "0")}`

      // Add new assignment to Firestore
      await addDoc(collection(db, "chatAssignments"), {
        assignmentId,
        studentId: selectedStudent,
        teacherId: selectedTeacher,
        assignedAt: serverTimestamp(),
        status: "active"
      })

      showToast("Chat assignment created successfully", "success")
      setSelectedStudent("")
      setSelectedTeacher("")
    } catch (err) {
      console.error("Error creating assignment:", err)
      showToast("Failed to create assignment", "error")
    }
  }

  const handleUnassign = async (assignmentId) => {
    if (confirm("Are you sure you want to remove this assignment?")) {
      try {
        // Delete the document from Firestore
        await deleteDoc(doc(db, "chatAssignments", assignmentId))
        showToast("Assignment removed successfully", "success")
      } catch (err) {
        console.error("Error deleting assignment:", err)
        showToast("Failed to remove assignment", "error")
      }
    }
  }

  const toggleAssignmentStatus = async (assignmentId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active"
      // Update the document in Firestore
      await updateDoc(doc(db, "chatAssignments", assignmentId), {
        status: newStatus
      })
      showToast(`Assignment ${newStatus === "active" ? "activated" : "deactivated"} successfully`, "success")
    } catch (err) {
      console.error("Error updating assignment status:", err)
      showToast("Failed to update assignment status", "error")
    }
  }

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000)
  }

  return (
    <div className="chat-assignment">
      <div className="page-header">
        <div>
          <h2>One-on-One Chat Assignment</h2>
          <p>Assign students to teachers for direct communication</p>
        </div>
      </div>

      {/* Toast notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <FiAlertCircle />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="assignment-form">
        <div className="form-card">
          <h3>Create New Assignment</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <FiUser /> Select Student
              </label>
              {loading.students ? (
                <div className="loading-select">Loading students...</div>
              ) : error.students ? (
                <div className="error-select">{error.students}</div>
              ) : (
                <select
                  className="form-select"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">Choose a student...</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.uid || student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiUserCheck /> Select Teacher
              </label>
              {loading.teachers ? (
                <div className="loading-select">Loading teachers...</div>
              ) : error.teachers ? (
                <div className="error-select">{error.teachers}</div>
              ) : (
                <select
                  className="form-select"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">Choose a teacher...</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.uid || teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button className="btn btn-primary assign-btn" onClick={handleAssign}>
              <FiMessageCircle /> Assign Chat
            </button>
          </div>
        </div>
      </div>

      <div className="assignments-section">
        <h3>Current Assignments</h3>
        {loading.assignments ? (
          <div className="loading-state">Loading assignments...</div>
        ) : error.assignments ? (
          <div className="error-state">{error.assignments}</div>
        ) : (
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
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.assignmentId}</td>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar student">
                            {assignment.studentName.charAt(0).toUpperCase()}
                          </div>
                          <span>{assignment.studentName}</span>
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar teacher">
                            {assignment.teacherName.charAt(0).toUpperCase()}
                          </div>
                          <span>{assignment.teacherName}</span>
                        </div>
                      </td>
                      <td>{new Date(assignment.assignedDate).toLocaleDateString()}</td>
                      <td>
                        <button
                          className={`status-toggle ${assignment.status}`}
                          onClick={() => toggleAssignmentStatus(assignment.id, assignment.status)}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      No assignments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
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

        .loading-state,
        .error-state,
        .empty-state {
          padding: 24px;
          text-align: center;
          background: white;
          border-radius: 8px;
          color: #718096;
        }

        .error-state {
          color: #c53030;
          background-color: #fed7d7;
        }

        .loading-select,
        .error-select {
          padding: 10px;
          border-radius: 6px;
          background: #f7fafc;
          color: #718096;
          font-size: 14px;
        }

        .error-select {
          color: #c53030;
          background-color: #fed7d7;
        }

        .toast-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }

        .toast-notification.success {
          background-color: #c6f6d5;
          color: #22543d;
        }

        .toast-notification.error {
          background-color: #fed7d7;
          color: #c53030;
        }

        .toast-notification.info {
          background-color: #bee3f8;
          color: #2c5282;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
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
