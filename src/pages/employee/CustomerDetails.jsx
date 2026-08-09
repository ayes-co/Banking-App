import DashboardShell from '../../components/DashboardShell.jsx'
import { customerLoans, customerProfile, customerTransactionHistory } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/employee', icon: 'DB', label: 'Dashboard' },
  { to: '/employee/customers', icon: 'CL', label: 'Customer List' },
  { to: '/employee/customers/new', icon: 'CC', label: 'Create Customer' },
  { to: '/employee/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/employee/transactions', icon: 'TR', label: 'Transaction Requests' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function CustomerDetails() {
  return (
    <DashboardShell
      topTitle="Customer Details"
      topSubtitle="View profile, transaction history, loan history, and account status."
      navItems={navItems}
      role="Employee"
      userName="Ali Raza"
      activePath="/employee/customers"
    >
      <section className="split-layout">
        <article className="panel">
          <div className="panel__head">
            <div>
              <h3>Profile Information</h3>
              <p>Account status and customer details</p>
            </div>
          </div>

          <div className="transaction-list">
            <div className="transaction-item">
              <span className="icon-badge icon-badge--info">NM</span>
              <div className="transaction-meta">
                <strong>{customerProfile.name}</strong>
                <small>Customer name</small>
              </div>
              <span className="badge active">{customerProfile.status}</span>
            </div>
            <div className="transaction-item">
              <span className="icon-badge icon-badge--info">AC</span>
              <div className="transaction-meta">
                <strong>{customerProfile.accountNumber}</strong>
                <small>Account number</small>
              </div>
            </div>
            <div className="transaction-item">
              <span className="icon-badge icon-badge--info">BL</span>
              <div className="transaction-meta">
                <strong>{customerProfile.balance}</strong>
                <small>Current balance</small>
              </div>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel__head">
            <div>
              <h3>Transaction and Loan History</h3>
              <p>Detailed customer activity</p>
            </div>
          </div>

          <div className="transaction-list">
            {customerTransactionHistory.map((row) => (
              <div className="transaction-item" key={`${row.type}-${row.date}`}>
                <span className="icon-badge icon-badge--soft">TX</span>
                <div className="transaction-meta">
                  <strong>{row.type}</strong>
                  <small>
                    {row.amount} • {row.date}
                  </small>
                </div>
                <span className={`badge ${row.status.toLowerCase()}`}>{row.status}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '18px' }} className="transaction-list">
            {customerLoans.map((loan) => (
              <div className="transaction-item" key={`${loan.amount}-${loan.purpose}`}>
                <span className="icon-badge icon-badge--soft">LN</span>
                <div className="transaction-meta">
                  <strong>{loan.purpose}</strong>
                  <small>
                    {loan.amount} • {loan.duration}
                  </small>
                </div>
                <span className={`badge ${loan.status.toLowerCase()}`}>{loan.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </DashboardShell>
  )
}

