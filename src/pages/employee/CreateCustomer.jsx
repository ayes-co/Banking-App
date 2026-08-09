import DashboardShell from '../../components/DashboardShell.jsx'

const navItems = [
  { to: '/employee', icon: 'DB', label: 'Dashboard' },
  { to: '/employee/customers', icon: 'CL', label: 'Customer List' },
  { to: '/employee/customers/new', icon: 'CC', label: 'Create Customer', end: true },
  { to: '/employee/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/employee/transactions', icon: 'TR', label: 'Transaction Requests' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

export default function CreateCustomer() {
  return (
    <DashboardShell
      topTitle="Create Customer"
      topSubtitle="Create a new customer account with email, password, and initial details."
      navItems={navItems}
      role="Employee"
      userName="Ali Raza"
      activePath="/employee/customers/new"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Customer Account Form</h3>
            <p>Generate authentication credentials and initial account details</p>
          </div>
        </div>

        <div className="auth-card" style={{ maxWidth: '100%', marginTop: 0 }}>
          <div className="form-group">
            <label>Name</label>
            <input placeholder="Customer name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input placeholder="Customer email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input placeholder="Temporary password" />
          </div>
          <div className="form-group">
            <label>Initial Balance</label>
            <input placeholder="0" />
          </div>

          <button className="primary-button" type="button">
            Create Customer Account
          </button>
        </div>
      </section>
    </DashboardShell>
  )
}

