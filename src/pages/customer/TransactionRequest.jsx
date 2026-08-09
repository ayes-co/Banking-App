import DashboardShell from '../../components/DashboardShell.jsx'
import { customerProfile } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/customer', icon: 'DB', label: 'Dashboard' },
  { to: '/customer/transactions', icon: 'TH', label: 'Transaction History' },
  { to: '/customer/loans', icon: 'LH', label: 'Loan Details' },
  { to: '/customer/request-loan', icon: 'RL', label: 'Request Loan' },
  { to: '/customer/transaction-request', icon: 'RQ', label: 'Deposit / Withdraw', end: true },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function TransactionRequest() {
  return (
    <DashboardShell
      topTitle="Deposit / Withdraw / Donation"
      topSubtitle={`Create a request for ${customerProfile.name}. All changes require approval.`}
      navItems={navItems}
      role="Customer"
      userName={customerProfile.name}
      activePath="/customer/transaction-request"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Request Form</h3>
            <p>Deposit, withdrawal, donation, or zakat requests</p>
          </div>
        </div>

        <div className="auth-card" style={{ maxWidth: '100%', marginTop: 0 }}>
          <div className="form-group">
            <label>Request Type</label>
            <input placeholder="Deposit / Withdraw / Donation / Zakat" />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input placeholder="Enter amount" />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <input placeholder="Optional remarks" />
          </div>

          <button className="primary-button" type="button">
            Submit Request
          </button>
        </div>
      </section>
    </DashboardShell>
  )
}

