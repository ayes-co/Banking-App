import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import { setUser } from '../redux/slices/authSlice'

const highlights = [
  {
    title: 'Role-based access',
    text: 'Separate dashboards for customer, employee, and manager users.',
  },
  {
    title: 'Secure workflow',
    text: 'Requests move through approval steps instead of direct balance edits.',
  },
  {
    title: 'Operational control',
    text: 'Employees and managers oversee accounts, loans, and requests.',
  },
]

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(email, password)
      dispatch(setUser(user))

      if (user.role === 'customer') navigate('/customer')
      else if (user.role === 'employee') navigate('/employee')
      else if (user.role === 'manager') navigate('/manager')
      else setError('Invalid user role.')
    } catch (loginError) {
      console.error('Login error:', loginError)
      setError(loginError.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <section className="auth-left">
        <p className="eyebrow">Enterprise Banking Management System</p>
        <h1>Secure. Controlled. Role-Based.</h1>
        <p>Login to access your banking dashboard and approved workflows.</p>

        <div className="feature-list">
          {highlights.map((item) => (
            <div className="feature-item" key={item.title}>
              <span className="feature-check">✓</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="auth-grid">
        <div className="banner">
          <p className="eyebrow">Login Screen</p>
          <h1>Enter your credentials</h1>
          <p>No public signup is available. Accounts are assigned by the bank.</p>
        </div>

        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Sign In</h2>
          <p>Use your email and password to continue.</p>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error ? <div className="error-message">{error}</div> : null}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="login-footer">
            New customer? <Link to="/signup">Sign up here</Link> or use an existing bank-issued account.
          </p>
        </form>
      </section>
    </div>
  )
}

export default Login

