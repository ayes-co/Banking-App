import DashboardShell from '../../components/DashboardShell.jsx'
import { employeeTransactionRequests } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/employee', icon: 'DB', label: 'Dashboard' },
  { to: '/employee/customers', icon: 'CL', label: 'Customer List' },
  { to: '/employee/customers/new', icon: 'CC', label: 'Create Customer' },
  { to: '/employee/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/employee/transactions', icon: 'TR', label: 'Transaction Requests', end: true },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function TransactionRequests() {
  return (
    <DashboardShell
      topTitle="Transaction Requests"
      topSubtitle="Approve or reject deposit and withdrawal requests."
      navItems={navItems}
      role="Employee"
      userName="Ali Raza"
      activePath="/employee/transactions"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Pending Deposit / Withdrawal Requests</h3>
            <p>Structured request processing</p>
          </div>
        </div>

        <div className="transaction-list">
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
      </section>
    </DashboardShell>
  )
}

