"use client"

import { useState } from "react"
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiX, FiUsers } from "react-icons/fi"

const mockBatches = [
  {
    id: "B001",
    name: "React Batch A",
    course: "React Fundamentals",
    teacher: "John Smith",
    students: ["Alice Johnson", "Bob Smith", "Carol Davis"],
    totalStudents: 3,
    status: "active",
    createdDate: "2024-12-01",
  },
  {
    id: "B002",
    name: "Python Beginners",
    course: "Python Basics",
    teacher: "Sarah Johnson",
    students: ["David Wilson", "Eva Brown"],
    totalStudents: 2,
    status: "active",
    createdDate: "2024-12-02",
  },
  {
    id: "B003",
    name: "Web Design Pro",
    course: "Web Design",
    teacher: "Mike Wilson",
    students: ["Frank Miller", "Grace Lee", "Henry Taylor", "Ivy Chen"],
    totalStudents: 4,
    status: "inactive",
    createdDate: "2024-12-03",
  },
]

const mockCourses = [
  "React Fundamentals",
  "JavaScript Advanced",
  "Python Basics",
  "Web Design",
  "UI/UX",
  "Data Science",
]
const mockTeachers = ["John Smith", "Sarah Johnson", "Mike Wilson", "Emily Davis", "David Brown"]
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
  "Kate Wilson",
  "Liam Brown",
  "Maya Patel",
  "Noah Davis",
  "Olivia Smith",
]

export default function BatchAssignment() {
  const [batches, setBatches] = useState(mockBatches)
  const [showModal, setShowModal] = useState(false)
  const [editingBatch, setEditingBatch] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    teacher: "",
    students: [],
    status: "active",
  })

  const filteredBatches = batches.filter(
    (batch) =>
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBatches = filteredBatches.slice(startIndex, startIndex + itemsPerPage)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingBatch) {
      setBatches(
        batches.map((batch) =>
          batch.id === editingBatch.id
            ? {
                ...batch,
                ...formData,
                totalStudents: formData.students.length,
                createdDate: batch.createdDate,
              }
            : batch,
        ),
      )
    } else {
      const newBatch = {
        id: `B${String(batches.length + 1).padStart(3, "0")}`,
        ...formData,
        totalStudents: formData.students.length,
        createdDate: new Date().toISOString().split("T")[0],
      }
      setBatches([...batches, newBatch])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      course: "",
      teacher: "",
      students: [],
      status: "active",
    })
    setEditingBatch(null)
    setShowModal(false)
  }

  const handleEdit = (batch) => {
    setEditingBatch(batch)
    setFormData({
      name: batch.name,
      course: batch.course,
      teacher: batch.teacher,
      students: batch.students,
      status: batch.status,
    })
    setShowModal(true)
  }

  const handleDelete = (batchId) => {
    if (confirm("Are you sure you want to delete this batch?")) {
      setBatches(batches.filter((batch) => batch.id !== batchId))
    }
  }

  const handleStudentToggle = (student) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.includes(student)
        ? prev.students.filter((s) => s !== student)
        : [...prev.students, student],
    }))
  }

  return (
    <div className="batch-assignment">
      <div className="page-header">
        <div>
          <h2>Batch Group Assignment</h2>
          <p>Create and manage student batches for courses</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Add New Batch
        </button>
      </div>

      <div className="search-bar">
        <div className="search-input">
          <FiSearch />
          <input
            type="text"
            placeholder="Search batches, courses, or teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Batch Name</th>
              <th>Course</th>
              <th>Assigned Teacher</th>
              <th>Total Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBatches.map((batch) => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>
                  <div className="batch-info">
                    <div className="batch-name">{batch.name}</div>
                    <div className="batch-date">Created: {new Date(batch.createdDate).toLocaleDateString()}</div>
                  </div>
                </td>
                <td>{batch.course}</td>
                <td>
                  <div className="teacher-info">
                    <div className="teacher-avatar">{batch.teacher.charAt(0).toUpperCase()}</div>
                    <span>{batch.teacher}</span>
                  </div>
                </td>
                <td>
                  <div className="students-count">
                    <FiUsers />
                    <span>{batch.totalStudents} students</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${batch.status === "active" ? "status-active" : "status-inactive"}`}>
                    {batch.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" onClick={() => handleEdit(batch)}>
                      <FiEdit />
                    </button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete(batch.id)}>
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
              <h3 className="modal-title">{editingBatch ? "Edit Batch" : "Add New Batch"}</h3>
              <button className="modal-close" onClick={resetForm}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Batch Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Course</label>
                <select
                  className="form-select"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  required
                >
                  <option value="">Choose a course...</option>
                  {mockCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Teacher</label>
                <select
                  className="form-select"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  required
                >
                  <option value="">Choose a teacher...</option>
                  {mockTeachers.map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Add Students ({formData.students.length} selected)</label>
                <div className="students-grid">
                  {mockStudents.map((student) => (
                    <label key={student} className="student-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.students.includes(student)}
                        onChange={() => handleStudentToggle(student)}
                      />
                      <span>{student}</span>
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
                  {editingBatch ? "Update Batch" : "Create Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .batch-assignment {
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

        .batch-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .batch-name {
          font-weight: 600;
          color: #2d3748;
        }

        .batch-date {
          font-size: 12px;
          color: #718096;
        }

        .teacher-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .teacher-avatar {
          width: 32px;
          height: 32px;
          background-color: #48bb78;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 12px;
        }

        .students-count {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4a5568;
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

        .students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #f7fafc;
        }

        .student-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .student-checkbox:hover {
          background-color: #e2e8f0;
        }

        .student-checkbox input[type="checkbox"] {
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

          .students-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
