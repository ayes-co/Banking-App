import DashboardShell from '../../components/DashboardShell.jsx'
import { customerLoans, customerProfile } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/customer', icon: 'DB', label: 'Dashboard' },
  { to: '/customer/transactions', icon: 'TH', label: 'Transaction History' },
  { to: '/customer/loans', icon: 'LH', label: 'Loan Details', end: true },
  { to: '/customer/request-loan', icon: 'RL', label: 'Request Loan' },
  { to: '/customer/transaction-request', icon: 'RQ', label: 'Deposit / Withdraw' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function LoanDetails() {
  return (
    <DashboardShell
      topTitle="Loan Details"
      topSubtitle={`Loan history for ${customerProfile.name}`}
      navItems={navItems}
      role="Customer"
      userName={customerProfile.name}
      activePath="/customer/loans"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Loan History</h3>
            <p>Approved, pending, and rejected loans</p>
          </div>
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
      </section>
    </DashboardShell>
  )
}

