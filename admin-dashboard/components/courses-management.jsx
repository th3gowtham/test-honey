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
    fee: "",
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
      fee: "",
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
      fee: course.fee || "",
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingCourse ? "Edit Course" : "Add New Course"}</h3>
              <button className="modal-close" onClick={resetForm}>
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
                <label className="form-label">Course Fee ($)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g., 299"
                  min="0"
                  step="0.01"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
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

              <div className="modal-actions">
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

      <style jsx>{`
        .courses-management {
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

        .course-name {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .course-description {
          font-size: 14px;
          color: #718096;
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

        .btn.btn-primary {
          background-color: #127d8e;
          color: white;
        }

        .btn.btn-primary:hover {
          background-color: #0e6270;
        }

        .status-badge.status-active {
          background-color: #b2f5ea;
          color: #234e52;
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

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
