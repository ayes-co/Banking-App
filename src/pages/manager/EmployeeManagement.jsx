import { useEffect, useState } from 'react'
import DashboardShell from '../../components/DashboardShell.jsx'
import { getEmployees } from '../../services/employeeService.js'

const navItems = [
  { to: '/manager', icon: 'DB', label: 'Dashboard' },
  { to: '/manager/customers', icon: 'CM', label: 'Customer Management' },
  { to: '/manager/employees', icon: 'EM', label: 'Employee Management', end: true },
  { to: '/manager/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/manager/transactions', icon: 'TO', label: 'Transaction Oversight' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

const formatCurrency = (value) => {
  const num = Number(value) || 0
  return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

const normalizeStatus = (status) => {
  const s = String(status || 'active').toLowerCase()
  if (s === 'active' || s === 'approved') return 'Active'
  if (s === 'rejected') return 'Rejected'
  return 'Pending'
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const data = await getEmployees()
        if (active) setEmployees(data)
      } catch (error) {
        console.error('Failed to load employees:', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [])

  return (
    <DashboardShell
      topTitle="Employee Management"
      topSubtitle="Create, edit, delete, and assign employee responsibilities."
      navItems={navItems}
      role="Manager"
      userName="Usman Malik"
      activePath="/manager/employees"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Employee Accounts</h3>
            <p>Name, email, role, salary, and status</p>
          </div>
        </div>

        {loading ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            Loading employees from Firestore...
          </p>
        ) : employees.length === 0 ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            No employees found in Firestore.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name || '—'}</td>
                  <td>{employee.email || '—'}</td>
                  <td>{employee.role || 'Employee'}</td>
                  <td>
                    {employee.salary
                      ? formatCurrency(employee.salary)
                      : 'N/A'}
                  </td>
                  <td>
                    <span
                      className={`badge ${normalizeStatus(employee.status).toLowerCase()}`}
                    >
                      {normalizeStatus(employee.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="action-grid" style={{ marginTop: '18px' }}>
          <div>
            <span>AD</span>
            <strong>Add Employee</strong>
            <small>Create new staff accounts</small>
          </div>
          <div>
            <span>ED</span>
            <strong>Edit Employee</strong>
            <small>Update salary and role</small>
          </div>
          <div>
            <span>DL</span>
            <strong>Delete Employee</strong>
            <small>Deactivate or remove access</small>
          </div>
          <div>
            <span>AS</span>
            <strong>Assign Role</strong>
            <small>Control responsibilities</small>
          </div>
        </div>
      </section>
    </DashboardShell>
  )
}
