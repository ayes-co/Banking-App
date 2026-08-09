import { useEffect, useState } from 'react'
import DashboardShell from '../../components/DashboardShell.jsx'
import { getLoans, approveLoan, rejectLoan } from '../../services/loanService.js'

const navItems = [
  { to: '/manager', icon: 'DB', label: 'Dashboard' },
  { to: '/manager/customers', icon: 'CM', label: 'Customer Management' },
  { to: '/manager/employees', icon: 'EM', label: 'Employee Management' },
  { to: '/manager/loans', icon: 'LR', label: 'Loan Requests', end: true },
  { to: '/manager/transactions', icon: 'TO', label: 'Transaction Oversight' },
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

const HIGH_VALUE_THRESHOLD = 1000000

export default function LoanRequests() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        const data = await getLoans()
        if (active) setLoans(data)
      } catch (error) {
        console.error('Failed to load loans:', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [])

  const highValueLoans = loans.filter(
    (loan) => (Number(loan.amount) || 0) > HIGH_VALUE_THRESHOLD,
  )
  const displayLoans = highValueLoans.length ? highValueLoans : loans

  const handleDecision = async (loanId, decision) => {
    setProcessingId(loanId)
    try {
      if (decision === 'approve') {
        await approveLoan(loanId, 'manager')
      } else {
        await rejectLoan(loanId, 'manager')
      }
      const data = await getLoans()
      setLoans(data)
    } catch (error) {
      console.error('Failed to process loan:', error)
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <DashboardShell
      topTitle="High-Value Loan Requests"
      topSubtitle="Approve or reject loans above the employee approval threshold."
      navItems={navItems}
      role="Manager"
      userName="Usman Malik"
      activePath="/manager/loans"
    >
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>Pending High-Value Requests</h3>
            <p>Loans exceeding the employee threshold are handled by management</p>
          </div>
        </div>

        {loading ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            Loading loan requests from Firestore...
          </p>
        ) : displayLoans.length === 0 ? (
          <p className="stat-card__note" style={{ margin: 0 }}>
            No loan requests found in Firestore.
          </p>
        ) : (
          <div className="transaction-list">
            {displayLoans.map((loan) => {
              const status = normalizeStatus(loan.status)
              return (
                <div className="transaction-item" key={loan.id}>
                  <span className="icon-badge icon-badge--info">HV</span>
                  <div className="transaction-meta">
                    <strong>{loan.name || loan.purpose || 'Loan'}</strong>
                    <small>
                      {formatCurrency(loan.amount)} • {loan.purpose || '—'}{' '}
                      {loan.duration ? `• ${loan.duration}` : ''}
                    </small>
                  </div>

                  {status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className="primary-button"
                        style={{ minHeight: '36px', padding: '0 16px', width: 'auto' }}
                        disabled={processingId === loan.id}
                        onClick={() => handleDecision(loan.id, 'approve')}
                      >
                        {processingId === loan.id ? '...' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        className="primary-button"
                        style={{
                          minHeight: '36px',
                          padding: '0 16px',
                          width: 'auto',
                          background: 'linear-gradient(135deg, #7f1d1d, #b91c1c)',
                        }}
                        disabled={processingId === loan.id}
                        onClick={() => handleDecision(loan.id, 'reject')}
                      >
                        {processingId === loan.id ? '...' : 'Reject'}
                      </button>
                    </div>
                  ) : (
                    <span className={`badge ${status.toLowerCase()}`}>{status}</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </DashboardShell>
  )
}
