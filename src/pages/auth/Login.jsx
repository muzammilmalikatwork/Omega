import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false })
  const [status, setStatus] = useState('')
  const navigate = useNavigate()
  const statusIsError = status && !/success|signed in|welcome/i.test(status)

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [id]: type === 'checkbox' ? checked : value,
    }))
  }

  const parseJsonResponse = async (response) => {
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      const text = await response.text()
      throw new Error(text || 'Server returned a non-JSON response. Make sure the backend is running.')
    }
    return response.json()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('Signing in...')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password, remember: formData.remember }),
      })

      const result = await parseJsonResponse(response)
      if (!response.ok) {
        throw new Error(result.error || 'Unable to sign in.')
      }

      window.dispatchEvent(new Event('omega-auth-changed'))

      let role = String(result?.user?.role || '').toLowerCase()
      try {
        const meResponse = await fetch('/api/me', { credentials: 'include' })
        if (meResponse.ok) {
          const meData = await meResponse.json()
          role = String(meData?.user?.role || role).toLowerCase()
        }
      } catch {
        // Ignore; fall back to role from login response.
      }

      if (role === 'admin') {
        setStatus('')
        navigate('/admin', { replace: true })
        return
      }

      setStatus(result.message)
      setTimeout(() => navigate('/'), 1200)
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <section className="login-page login-page--elegant">
      <div className="site-container login-grid">
        <div className="login-visual login-visual--editorial">
          <div className="login-visual-overlay" />
          <div className="login-visual-shell">
            <div className="login-brand-mark">Omega Dairy</div>
            <div className="login-visual-copy">
              <p className="login-kicker">Private Member Access</p>
              <h1>Sign in to your account with a calmer, cleaner workspace.</h1>
              <p>
                Track your activity, manage supply communication, and keep your Omega experience
                connected to the farm in one refined dashboard.
              </p>
            </div>

            <div className="login-visual-highlights">
              <article>
                <strong>160,000L</strong>
                <span>Daily premium milk production capacity</span>
              </article>
              <article>
                <strong>3 Units</strong>
                <span>Agriculture, dairy processing, and livestock care</span>
              </article>
            </div>

            <div className="login-visual-card">
              <p className="login-visual-card-label">Member benefits</p>
              <ul>
                <li>Secure account access for admins and users</li>
                <li>Faster updates across farm operations and supply flow</li>
                <li>Consistent access to the latest Omega website features</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="login-panel login-panel--elegant">
          <div className="login-panel-top">
            <div className="login-brand">Omega Access</div>
            <Link to="/" className="login-back-link">Back to website</Link>
          </div>

          <div className="login-copy">
            <h2 className="login-eyebrow">Welcome back</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-meta">
              <label className="checkbox-label">
                <input
                  id="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <button type="button" className="text-link login-forgot">
                Forgot Password?
              </button>
            </div>

            <button className="btn btn-primary login-button" type="submit">
              Sign in
            </button>

            <div className="login-divider">
              <span>Omega Dairy Private Portal</span>
            </div>

            <p className="login-footer">
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </p>
            {status && <p className={`login-status${statusIsError ? ' is-error' : ''}`}>{status}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

