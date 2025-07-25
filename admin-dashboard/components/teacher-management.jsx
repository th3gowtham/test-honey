"use client"

import { useState } from "react"
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiX } from "react-icons/fi"

const mockTeachers = [
  {
    id: "T001",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1234567890",
    courses: ["React Fundamentals", "JavaScript Advanced"],
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "T002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1234567891",
    courses: ["Python Basics"],
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: "T003",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1234567892",
    courses: ["Web Design", "UI/UX"],
    status: "active",
    joinDate: "2024-01-10",
  },
  {
    id: "T004",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1234567893",
    courses: ["Data Science"],
    status: "inactive",
    joinDate: "2024-03-05",
  },
]

const mockCourses = [
  "React Fundamentals",
  "JavaScript Advanced",
  "Python Basics",
  "Web Design",
  "UI/UX",
  "Data Science",
  "Machine Learning",
  "Node.js",
]

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState(mockTeachers)
  const [showModal, setShowModal] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courses: [],
    status: "active",
  })

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingTeacher) {
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === editingTeacher.id ? { ...teacher, ...formData, joinDate: teacher.joinDate } : teacher,
        ),
      )
    } else {
      const newTeacher = {
        id: `T${String(teachers.length + 1).padStart(3, "0")}`,
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      }
      setTeachers([...teachers, newTeacher])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      courses: [],
      status: "active",
    })
    setEditingTeacher(null)
    setShowModal(false)
  }

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher)
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      courses: teacher.courses,
      status: teacher.status,
    })
    setShowModal(true)
  }

  const handleDelete = (teacherId) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((teacher) => teacher.id !== teacherId))
    }
  }

  const handleCourseToggle = (course) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(course) ? prev.courses.filter((c) => c !== course) : [...prev.courses, course],
    }))
  }

  return (
    <div className="teacher-management">
      <div className="page-header">
        <div>
          <h2>Teacher Management</h2>
          <p>Manage teachers and their course assignments</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add Teacher
        </button>
      </div>

      <div className="search-bar">
        <div className="search-input">
          <FiSearch />
          <input
            type="text"
            placeholder="Search teachers, emails, or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Courses Assigned</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>
                  <div className="teacher-info">
                    <div className="teacher-avatar">{teacher.name.charAt(0).toUpperCase()}</div>
                    <span className="teacher-name">{teacher.name}</span>
                  </div>
                </td>
                <td>
                  <div className="courses-list">
                    {teacher.courses.map((course, index) => (
                      <span key={index} className="course-tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>
                  <span className={`status-badge ${teacher.status === "active" ? "status-active" : "status-inactive"}`}>
                    {teacher.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" onClick={() => handleEdit(teacher)}>
                      <FiEdit />
                    </button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete(teacher.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h3>
              <button className="modal-close" onClick={resetForm}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assign Courses</label>
                <div className="courses-grid">
                  {mockCourses.map((course) => (
                    <label key={course} className="course-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.courses.includes(course)}
                        onChange={() => handleCourseToggle(course)}
                      />
                      <span>{course}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTeacher ? "Update Teacher" : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .teacher-management {
          max-width: 1400px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
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

        .search-input {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input svg {
          position: absolute;
          left: 12px;
          color: #a0aec0;
        }

        .search-input input {
          padding-left: 40px;
        }

        .teacher-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .teacher-avatar {
          width: 40px;
          height: 40px;
          background-color: #48bb78;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .teacher-name {
          font-weight: 500;
          color: #2d3748;
        }

        .courses-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .course-tag {
          background-color: #e6f7f9;
          color: #0f6b7a;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
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

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          max-height: 200px;
          overflow-y: auto;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #f7fafc;
        }

        .course-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .course-checkbox:hover {
          background-color: #e2e8f0;
        }

        .course-checkbox input[type="checkbox"] {
          margin: 0;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .page-header h2 {
            font-size: 24px;
          }

          .table-container {
            overflow-x: auto;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
