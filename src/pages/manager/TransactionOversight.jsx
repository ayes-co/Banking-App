import { useEffect, useState } from 'react'
import DashboardShell from '../../components/DashboardShell.jsx'
import { getTransactions } from '../../services/transactionService.js'

const navItems = [
  { to: '/manager', icon: 'DB', label: 'Dashboard' },
  { to: '/manager/customers', icon: 'CM', label: 'Customer Management' },
  { to: '/manager/employees', icon: 'EM', label: 'Employee Management' },
  { to: '/manager/loans', icon: 'LR', label: 'Loan Requests' },
  { to: '/manager/transactions', icon: 'TO', label: 'Transaction Oversight', end: true },
  { to: '/login', icon: 'LO', label: 'Logout' },
]

const formatCurrency = (value) => {
  const num = Number(value) || 0
  return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

const normalizeStatus = (status) => {
  const s = String(status || 'pending').toLowerCase()
  if (s === 'approved') return 'Approved'
  if (s === 'rejected') return 'Rejected'
  return 'Pending'
}

export default function TransactionOversight() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const data = await getTransactions()
        if (active) setTransactions(data)
      } catch (error) {
        console.error('Failed to load transactions:', error)
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
      topTitle="Transaction Oversight"
      topSubtitle="Monitor all deposit and withdrawal requests and approval flow."
      navItems={navItems}
      role="Manager"
      userName="Usman Malik"
      activePath="/manager/transactions"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>All Requests</h3>
            <p>Deposit, withdrawal, donation, and other approvals</p>
          </div>
        </div>

        {loading ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            Loading transactions from Firestore...
          </p>
        ) : transactions.length === 0 ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            No transactions found in Firestore.
          </p>
        ) : (
          <div className="transaction-list">
            {transactions.map((item) => {
              const status = normalizeStatus(item.status)
              return (
                <div className="transaction-item" key={item.id}>
                  <span className="icon-badge icon-badge--info">TR</span>
                  <div className="transaction-meta">
                    <strong>{item.name || item.userName || 'Transaction'}</strong>
                    <small>
                      {item.type || '—'} • {formatCurrency(item.amount)} •{' '}
                      {item.date || '—'}
                    </small>
                  </div>
                  <span className={`badge ${status.toLowerCase()}`}>{status}</span>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </DashboardShell>
  )
}
