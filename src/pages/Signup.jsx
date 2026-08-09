import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../services/authService'
import { setUser } from '../redux/slices/authSlice'

const highlights = [
  {
    title: 'Customer onboarding',
    text: 'Create a new customer account and access customer dashboards directly.',
  },
  {
    title: 'Secure credentials',
    text: 'Email and password registration with Firebase authentication.',
  },
  {
    title: 'Instant access',
    text: 'Sign in immediately after registration to manage your banking profile.',
  },
]

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await signup({ name, email, password })
      dispatch(setUser(user))
      navigate('/customer')
    } catch (signupError) {
      console.error('Signup error:', signupError)
      setError(signupError.message || 'Signup failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <section className="auth-left">
        <p className="eyebrow">New Account Registration</p>
        <h1>Start your customer banking journey</h1>
        <p>Register as a customer to create a secure account and request loans or transactions.</p>

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
          <p className="eyebrow">Create customer account</p>
          <h1>Register your credentials</h1>
          <p>Existing accounts can still log in from the login page.</p>
        </div>

        <form className="auth-card" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <p>Create a secure customer account with your email and password.</p>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <p className="login-footer">
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </form>
      </section>
    </div>
  )
}

export default Signup
