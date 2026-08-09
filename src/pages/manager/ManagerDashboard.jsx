import { useEffect, useState } from 'react'
import DashboardShell from '../../components/DashboardShell.jsx'
import { getCustomers } from '../../services/customerService.js'
import { getEmployees } from '../../services/employeeService.js'
import { getLoans } from '../../services/loanService.js'
import { getTransactions } from '../../services/transactionService.js'

const navItems = [
  { to: '/manager', icon: 'DB', label: 'Dashboard', end: true },
  { to: '/manager/customers', icon: 'CM', label: 'Customer Management' },
  { to: '/manager/employees', icon: 'EM', label: 'Employee Management' },
  { to: '/manager/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/manager/transactions', icon: 'TO', label: 'Transaction Oversight' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

const formatCurrency = (value) => {
  const num = Number(value) || 0
  return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

const normalizeStatus = (status) => {
  const s = String(status || 'pending').toLowerCase()
  if (['Active', 'Approved'].map((x) => x.toLowerCase()).includes(s)) return 'Active'
  if (s === 'rejected') return 'Rejected'
  return 'Pending'
}

export default function ManagerDashboard() {
  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [loans, setLoans] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const [cust, emp, loansData, txns] = await Promise.all([
          getCustomers(),
          getEmployees(),
          getLoans(),
          getTransactions(),
        ])
        if (!active) return
        setCustomers(cust)
        setEmployees(emp)
        setLoans(loansData)
        setTransactions(txns)
      } catch (error) {
        console.error('Failed to load manager dashboard data:', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [])

  const totalBalance = customers.reduce(
    (sum, c) => sum + (Number(c.balance) || 0),
    0,
  )
  const totalLoansIssued = loans.reduce(
    (sum, l) => sum + (Number(l.amount) || 0),
    0,
  )
  const activeCustomers = customers.filter(
    (c) => normalizeStatus(c.status) === 'Active',
  ).length
  const pendingActivity =
    transactions.filter((t) => normalizeStatus(t.status) === 'Pending').length +
    loans.filter((l) => normalizeStatus(l.status) === 'Pending').length

  const metrics = [
    {
      title: 'Total Bank Balance',
      value: formatCurrency(totalBalance),
      note: 'System-wide balance overview',
    },
    {
      title: 'Total Loans Issued',
      value: formatCurrency(totalLoansIssued),
      note: 'High-value and low-value approvals',
    },
    {
      title: 'Active Customers',
      value: String(activeCustomers),
      note: 'Customer accounts under bank control',
    },
    {
      title: 'Pending Activity',
      value: String(pendingActivity),
      note: 'Transactions + loan requests awaiting approval',
    },
  ]

  return (
    <DashboardShell
      topTitle="Manager Dashboard"
      topSubtitle="Oversee customers, employees, loan approvals, and transaction oversight."
      navItems={navItems}
      role="Manager"
      userName="Usman Malik"
      activePath="/manager"
    >
      {loading ? (
        <div className="panel">Loading live data from Firestore...</div>
      ) : (
        <>
          <section className="stat-grid">
            {metrics.map((metric) => (
              <article className="stat-card" key={metric.title}>
                <div className="stat-card__top">
                  <span className="stat-card__title">{metric.title}</span>
                  <span className="icon-badge icon-badge--info">MG</span>
                </div>
                <h2 className="stat-card__value">{metric.value}</h2>
                <p className="stat-card__note">{metric.note}</p>
              </article>
            ))}
          </section>

          <section className="split-layout">
            <article className="panel">
              <div className="panel__head">
                <div>
                  <h3>Customer Management</h3>
                  <p>Full access to all customer records</p>
                </div>
              </div>

              {customers.length === 0 ? (
                <p className="stat-card__note" style={{ margin: 0 }}>
                  No customers found in Firestore.
                </p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Account Number</th>
                      <th>Balance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.name || '—'}</td>
                        <td>{customer.accountNumber || '—'}</td>
                        <td>{formatCurrency(customer.balance)}</td>
                        <td>
                          <span
                            className={`badge ${normalizeStatus(customer.status).toLowerCase()}`}
                          >
                            {normalizeStatus(customer.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </article>

            <article className="panel">
              <div className="panel__head">
                <div>
                  <h3>Employee Management</h3>
                  <p>CRUD operations, salaries, and responsibilities</p>
                </div>
              </div>

              {employees.length === 0 ? (
                <p className="stat-card__note" style={{ margin: 0 }}>
                  No employees found in Firestore.
                </p>
              ) : (
                <div className="transaction-list">
                  {employees.map((employee) => (
                    <div className="transaction-item" key={employee.id}>
                      <span className="icon-badge icon-badge--soft">EM</span>
                      <div className="transaction-meta">
                        <strong>{employee.name || '—'}</strong>
                        <small>
                          {employee.email} • {employee.role || 'Employee'}
                        </small>
                      </div>
                      <span
                        className={`badge ${normalizeStatus(employee.status).toLowerCase()}`}
                      >
                        {employee.salary
                          ? formatCurrency(employee.salary)
                          : normalizeStatus(employee.status)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </section>
        </>
      )}
    </DashboardShell>
  )
}
