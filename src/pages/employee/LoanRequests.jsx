import DashboardShell from '../../components/DashboardShell.jsx'
import { employeeLoanRequests } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/employee', icon: 'DB', label: 'Dashboard' },
  { to: '/employee/customers', icon: 'CL', label: 'Customer List' },
  { to: '/employee/customers/new', icon: 'CC', label: 'Create Customer' },
  { to: '/employee/loans', icon: 'LR', label: 'Loan Requests', end: true },
  { to: '/employee/transactions', icon: 'TR', label: 'Transaction Requests' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function LoanRequests() {
  return (
    <DashboardShell
      topTitle="Loan Requests"
      topSubtitle="Review low-to-medium value loans and forward high-value requests to management."
      navItems={navItems}
      role="Employee"
      userName="Ali Raza"
      activePath="/employee/loans"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Pending Loan Requests</h3>
            <p>Employee can approve loans up to the documented threshold</p>
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
      </section>
    </DashboardShell>
  )
}

