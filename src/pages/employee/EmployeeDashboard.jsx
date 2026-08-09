import DashboardShell from '../../components/DashboardShell.jsx'
import {
  employeeCustomers,
  employeeLoanRequests,
  employeeTransactionRequests,
} from '../../data/bankingMockData.js'

const navItems = [
  { to: '/employee', icon: 'DB', label: 'Dashboard', end: true },
  { to: '/employee/customers', icon: 'CL', label: 'Customer List' },
  { to: '/employee/customers/new', icon: 'CC', label: 'Create Customer' },
  { to: '/employee/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/employee/transactions', icon: 'TR', label: 'Transaction Requests' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

const metrics = [
  { title: 'Total Customers Managed', value: employeeCustomers.length.toString(), note: 'Managed by employee' },
  { title: 'Pending Loan Requests', value: employeeLoanRequests.filter((loan) => loan.status === 'Pending').length.toString(), note: 'Awaiting approval' },
  { title: 'Pending Transaction Requests', value: employeeTransactionRequests.filter((item) => item.status === 'Pending').length.toString(), note: 'Deposit / withdraw' },
  { title: 'Customer Accounts', value: employeeCustomers.length.toString(), note: 'View and process' },
]

export default function EmployeeDashboard() {
  return (
    <DashboardShell
      topTitle="Employee Dashboard"
      topSubtitle="Manage customer accounts, process requests, and approve low-to-medium value loans."
      navItems={navItems}
      role="Employee"
      userName="Ali Raza"
      activePath="/employee"
    >
      <section className="stat-grid">
        {metrics.map((metric) => (
          <article className="stat-card" key={metric.title}>
            <div className="stat-card__top">
              <span className="stat-card__title">{metric.title}</span>
              <span className="icon-badge icon-badge--info">EM</span>
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
              <h3>Customer List Snapshot</h3>
              <p>View all customer accounts with balance and account number</p>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Number</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {employeeCustomers.map((customer) => (
                <tr key={customer.accountNumber}>
                  <td>{customer.name}</td>
                  <td>{customer.accountNumber}</td>
                  <td>{customer.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="panel">
          <div className="panel__head">
            <div>
              <h3>Workflow Queue</h3>
              <p>Pending loans and transaction requests</p>
            </div>
          </div>

          <div className="transaction-list">
            {employeeLoanRequests.map((loan) => (
              <div className="transaction-item" key={`${loan.name}-${loan.amount}`}>
                <span className="icon-badge icon-badge--info">LN</span>
                <div className="transaction-meta">
                  <strong>{loan.name}</strong>
                  <small>
                    {loan.amount} • {loan.purpose}
                  </small>
                </div>
                <span className={`badge ${loan.status.toLowerCase()}`}>{loan.status}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '18px' }} className="transaction-list">
            {employeeTransactionRequests.map((item) => (
              <div className="transaction-item" key={`${item.name}-${item.amount}`}>
                <span className="icon-badge icon-badge--info">TX</span>
                <div className="transaction-meta">
                  <strong>{item.name}</strong>
                  <small>
                    {item.type} • {item.amount}
                  </small>
                </div>
                <span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </DashboardShell>
  )
}

