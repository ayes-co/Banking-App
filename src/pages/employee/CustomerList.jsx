import DashboardShell from '../../components/DashboardShell.jsx'
import { employeeCustomers } from '../../data/bankingMockData.js'

const navItems = [
  { to: '/employee', icon: 'DB', label: 'Dashboard' },
  { to: '/employee/customers', icon: 'CL', label: 'Customer List', end: true },
  { to: '/employee/customers/new', icon: 'CC', label: 'Create Customer' },
  { to: '/employee/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/employee/transactions', icon: 'TR', label: 'Transaction Requests' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function CustomerList() {
  return (
    <DashboardShell
      topTitle="Customer List"
      topSubtitle="View customers with basic account details and open the detailed profile."
      navItems={navItems}
      role="Employee"
      userName="Ali Raza"
      activePath="/employee/customers"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>All Customers</h3>
            <p>Name, account number, and current balance</p>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Number</th>
              <th>Balance</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employeeCustomers.map((customer) => (
              <tr key={customer.accountNumber}>
                <td>{customer.name}</td>
                <td>{customer.accountNumber}</td>
                <td>{customer.balance}</td>
                <td>
                  <span className="badge approved">View Details</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardShell>
  )
}

