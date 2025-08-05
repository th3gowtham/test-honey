"use client"

import { useState } from "react"
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiX } from "react-icons/fi"

const mockCourses = [
  {
    id: "C001",
    name: "React Fundamentals",
    teacher: "John Smith",
    students: 45,
    status: "active",
    duration: "8 weeks",
    description: "Learn the basics of React",
  },
  {
    id: "C002",
    name: "JavaScript Advanced",
    teacher: "Sarah Johnson",
    students: 32,
    status: "active",
    duration: "12 weeks",
    description: "Advanced JavaScript concepts",
  },
  {
    id: "C003",
    name: "Python Basics",
    teacher: "Mike Wilson",
    students: 28,
    status: "inactive",
    duration: "6 weeks",
    description: "Introduction to Python programming",
  },
  {
    id: "C004",
    name: "Web Design",
    teacher: "Emily Davis",
    students: 38,
    status: "active",
    duration: "10 weeks",
    description: "Modern web design principles",
  },
]

const mockTeachers = ["John Smith", "Sarah Johnson", "Mike Wilson", "Emily Davis", "David Brown"]

export default function CoursesManagement() {
  const [courses, setCourses] = useState(mockCourses)
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    duration: "",
    description: "",
    status: "active",
  })

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id ? { ...course, ...formData, students: course.students } : course,
        ),
      )
    } else {
      const newCourse = {
        id: `C${String(courses.length + 1).padStart(3, "0")}`,
        ...formData,
        students: 0,
      }
      setCourses([...courses, newCourse])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      teacher: "",
      duration: "",
      description: "",
      status: "active",
    })
    setEditingCourse(null)
    setShowModal(false)
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      teacher: course.teacher,
      duration: course.duration,
      description: course.description,
      status: course.status,
    })
    setShowModal(true)
  }

  const handleDelete = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== courseId))
    }
  }

  return (
    <div className="courses-management">
      <div className="page-header">
        <div>
          <h2>Courses Management</h2>
          <p>Manage all courses and their assignments</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add New Course
        </button>
      </div>

      <div className="search-bar">
        <div className="search-input">
          <FiSearch />
          <input
            type="text"
            placeholder="Search courses or teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Assigned Teacher</th>
              <th>Total Students</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>
                  <div>
                    <div className="course-name">{course.name}</div>
                    <div className="course-description">{course.description}</div>
                  </div>
                </td>
                <td>{course.teacher}</td>
                <td>{course.students}</td>
                <td>{course.duration}</td>
                <td>
                  <span className={`status-badge ${course.status === "active" ? "status-active" : "status-inactive"}`}>
                    {course.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" onClick={() => handleEdit(course)}>
                      <FiEdit />
                    </button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete(course.id)}>
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

      {/* MODAL: Add/Edit Course */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "white", padding: 32, borderRadius: 12, maxWidth: 500, width: "90%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: "#2d3748" }}>{editingCourse ? "Edit Course" : "Add New Course"}</h3>
              <button style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#a0aec0", padding: 4 }} onClick={resetForm}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Assign Teacher</label>
                <select
                  className="form-select"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  required
                >
                  <option value="">Select a teacher</option>
                  {mockTeachers.map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Course Duration</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 8 weeks"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
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
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCourse ? "Update Course" : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* END MODAL */}

    </div>
  )
}
