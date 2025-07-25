"use client"

import { useState } from "react"
import { FiSearch, FiFilter, FiEdit, FiTrash2 } from "react-icons/fi"

const mockUsers = [
  {
    id: "U001",
    name: "Alice Johnson",
    role: "student",
    email: "alice@example.com",
    phone: "+1234567890",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "U002",
    name: "Bob Smith",
    role: "student",
    email: "bob@example.com",
    phone: "+1234567891",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: "U003",
    name: "Carol Davis",
    role: "admin",
    email: "carol@example.com",
    phone: "+1234567892",
    status: "active",
    joinDate: "2024-01-10",
  },
  {
    id: "U004",
    name: "David Wilson",
    role: "student",
    email: "david@example.com",
    phone: "+1234567893",
    status: "inactive",
    joinDate: "2024-03-05",
  },
  {
    id: "U005",
    name: "Eva Brown",
    role: "student",
    email: "eva@example.com",
    phone: "+1234567894",
    status: "active",
    joinDate: "2024-02-28",
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <div>
          <h2>User Management</h2>
          <p>Manage all platform users and their permissions</p>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-input">
          <FiSearch />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-item">
            <FiFilter />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          <div className="filter-item">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                    <span className="user-name">{user.name}</span>
                  </div>
                </td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                <td>
                  <button className={`status-toggle ${user.status}`} onClick={() => toggleUserStatus(user.id)}>
                    {user.status}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <FiEdit />
                    </button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete(user.id)}>
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

      <style jsx>{`
        .user-management {
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

        .filters-section {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
          align-items: center;
        }

        .search-input {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 400px;
        }

        .search-input svg {
          position: absolute;
          left: 12px;
          color: #a0aec0;
        }

        .search-input input {
          padding-left: 40px;
          width: 100%;
        }

        .filter-group {
          display: flex;
          gap: 16px;
        }

        .filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4a5568;
        }

        .filter-item select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          cursor: pointer;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: #127d8e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .user-name {
          font-weight: 500;
          color: #2d3748;
        }

        .role-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .role-badge.student {
          background-color: #e6f7f9;
          color: #0f6b7a;
        }

        .role-badge.admin {
          background-color: #fbb6ce;
          color: #b83280;
        }

        .status-toggle {
          padding: 4px 12px;
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

        @media (max-width: 768px) {
          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-input {
            max-width: none;
          }

          .filter-group {
            justify-content: space-between;
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
