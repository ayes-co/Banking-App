import DashboardShell from '../../components/DashboardShell.jsx'
import { customerProfile } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/customer', icon: 'DB', label: 'Dashboard' },
  { to: '/customer/transactions', icon: 'TH', label: 'Transaction History' },
  { to: '/customer/loans', icon: 'LH', label: 'Loan Details' },
  { to: '/customer/request-loan', icon: 'RL', label: 'Request Loan', end: true },
  { to: '/customer/transaction-request', icon: 'RQ', label: 'Deposit / Withdraw' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function RequestLoan() {
  return (
    <DashboardShell
      topTitle="Request Loan"
      topSubtitle={`Submit a new loan request for ${customerProfile.name}`}
      navItems={navItems}
      role="Customer"
      userName={customerProfile.name}
      activePath="/customer/request-loan"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Loan Request Form</h3>
            <p>Requested amount, purpose, duration, and notes</p>
          </div>
        </div>

        <div className="auth-card" style={{ maxWidth: '100%', marginTop: 0 }}>
          <div className="form-group">
            <label>Requested Amount</label>
            <input placeholder="Enter amount" />
          </div>
          <div className="form-group">
            <label>Purpose of Loan</label>
            <input placeholder="Business Expansion / Education / Property Purchase" />
          </div>
          <div className="form-group">
            <label>Duration (Months)</label>
            <input placeholder="12" />
          </div>
          <div className="form-group">
            <label>Optional Notes</label>
            <input placeholder="Additional details" />
          </div>

          <button className="primary-button" type="button">
            Submit Loan Request
          </button>
        </div>
      </section>
    </DashboardShell>
  )
}

