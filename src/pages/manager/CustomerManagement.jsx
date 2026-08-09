import { useEffect, useState } from 'react'
import DashboardShell from '../../components/DashboardShell.jsx'
import { getCustomers } from '../../services/customerService.js'

const navItems = [
  { to: '/manager', icon: 'DB', label: 'Dashboard' },
  { to: '/manager/customers', icon: 'CM', label: 'Customer Management', end: true },
  { to: '/manager/employees', icon: 'EM', label: 'Employee Management' },
  { to: '/manager/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/manager/transactions', icon: 'TO', label: 'Transaction Oversight' },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

const formatCurrency = (value) => {
  const num = Number(value) || 0
  return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

const normalizeStatus = (status) => {
  const s = String(status || 'pending').toLowerCase()
  if (s === 'active' || s === 'approved') return 'Active'
  if (s === 'rejected') return 'Rejected'
  return 'Pending'
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const data = await getCustomers()
        if (active) setCustomers(data)
      } catch (error) {
        console.error('Failed to load customers:', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [])

  return (
    <DashboardShell
      topTitle="Customer Management"
      topSubtitle="View all customers, open detailed profiles, and monitor transactions and loans."
      navItems={navItems}
      role="Manager"
      userName="Usman Malik"
      activePath="/manager/customers"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>All Customers</h3>
            <p>Complete customer management view</p>
          </div>
        </div>

        {loading ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            Loading customers from Firestore...
          </p>
        ) : customers.length === 0 ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            No customers found in Firestore.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Number</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name || '—'}</td>
                  <td>{customer.accountNumber || '—'}</td>
                  <td>{formatCurrency(customer.balance)}</td>
                  <td>
                    <span
                      className={`badge ${normalizeStatus(customer.status).toLowerCase()}`}
                    >
                      {normalizeStatus(customer.status)}
                    </span>
                  </td>
                  <td>
                    <span className="badge approved">View Profile</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </DashboardShell>
  )
}
