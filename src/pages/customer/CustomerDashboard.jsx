import { Link } from 'react-router-dom'
import DashboardShell from '../../components/DashboardShell.jsx'
import {
  customerActions,
  customerLoans,
  customerProfile,
  customerTransactionHistory,
} from '../../data/bankingMockData.js'

const navItems = [
  { to: '/customer', icon: 'DB', label: 'Dashboard', end: true },
  { to: '/customer/transactions', icon: 'TH', label: 'Transaction History' },
  { to: '/customer/loans', icon: 'LH', label: 'Loan Details' },
  { to: '/customer/request-loan', icon: 'RL', label: 'Request Loan' },
  { to: '/customer/transaction-request', icon: 'RQ', label: 'Deposit / Withdraw' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

function CustomerDashboard() {
  return (
    <DashboardShell
      topTitle="Customer Dashboard"
      topSubtitle="View your account details, track history, and submit banking requests."
      navItems={navItems}
      role="Customer"
      userName={customerProfile.name}
    >
      <section className="stat-grid">
        <article className="stat-card">
          <div className="stat-card__top">
            <span className="stat-card__title">Account Holder</span>
            <span className="icon-badge icon-badge--info">CH</span>
          </div>
          <h2 className="stat-card__value">{customerProfile.name}</h2>
          <p className="stat-card__note">Full name on bank record</p>
        </article>

        <article className="stat-card">
          <div className="stat-card__top">
            <span className="stat-card__title">Account Number</span>
            <span className="icon-badge icon-badge--soft">AC</span>
          </div>
          <h2 className="stat-card__value">{customerProfile.accountNumber}</h2>
          <p className="stat-card__note">Optional identifier</p>
        </article>

        <article className="stat-card">
          <div className="stat-card__top">
            <span className="stat-card__title">Account Status</span>
            <span className="icon-badge icon-badge--success">OK</span>
          </div>
          <h2 className="stat-card__value">{customerProfile.status}</h2>
          <p className="stat-card__note">Active / Inactive</p>
        </article>

        <article className="stat-card">
          <div className="stat-card__top">
            <span className="stat-card__title">Current Balance</span>
            <span className="icon-badge icon-badge--info">BD</span>
          </div>
          <h2 className="stat-card__value">{customerProfile.balance}</h2>
          <p className="stat-card__note">Read-only account balance</p>
        </article>
      </section>

      <section className="split-layout">
        <article className="panel">
          <div className="panel__head">
            <div>
              <h3>Transaction History</h3>
              <p>All recent customer transactions</p>
            </div>
            <Link to="/customer/transactions">View all</Link>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customerTransactionHistory.map((row) => (
                <tr key={`${row.type}-${row.date}`}>
                  <td>{row.type}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`badge ${row.status.toLowerCase()}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="panel">
          <div className="panel__head">
            <div>
              <h3>Loan History</h3>
              <p>Approved, pending, and rejected loans</p>
            </div>
            <Link to="/customer/loans">View all</Link>
          </div>

          <div className="transaction-list">
            {customerLoans.map((loan) => (
              <div className="transaction-item" key={`${loan.amount}-${loan.purpose}`}>
                <span className="icon-badge icon-badge--info">LN</span>
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

      <section className="panel actions-card">
        <div className="panel__head">
          <div>
            <h3>Customer Actions</h3>
            <p>{customerActions.length} approved banking actions available</p>
          </div>
        </div>

        <div className="action-grid">
          <Link to="/customer/request-loan">
            <span>RL</span>
            <strong>Request Loan</strong>
            <small>Submit a new request</small>
          </Link>
          <Link to="/customer/transaction-request">
            <span>TX</span>
            <strong>Deposit / Withdraw</strong>
            <small>Send structured request</small>
          </Link>
          <Link to="/customer/transactions">
            <span>TH</span>
            <strong>Transaction History</strong>
            <small>Review past activity</small>
          </Link>
          <Link to="/customer/loans">
            <span>LH</span>
            <strong>Loan Details</strong>
            <small>Check loan status</small>
          </Link>
        </div>
      </section>
    </DashboardShell>
  )
}

export default CustomerDashboard

