import DashboardShell from '../../components/DashboardShell.jsx'
import { customerProfile, customerTransactionHistory } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/customer', icon: 'DB', label: 'Dashboard' },
  { to: '/customer/transactions', icon: 'TH', label: 'Transaction History', end: true },
  { to: '/customer/loans', icon: 'LH', label: 'Loan Details' },
  { to: '/customer/request-loan', icon: 'RL', label: 'Request Loan' },
  { to: '/customer/transaction-request', icon: 'RQ', label: 'Deposit / Withdraw' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function TransactionHistory() {
  return (
    <DashboardShell
      topTitle="Transaction History"
      topSubtitle={`All transactions for ${customerProfile.name}`}
      navItems={navItems}
      role="Customer"
      userName={customerProfile.name}
      activePath="/customer/transactions"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Past Activities</h3>
            <p>Deposit, withdrawal, donation, and other records</p>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Transaction Type</th>
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
      </section>
    </DashboardShell>
  )
}

