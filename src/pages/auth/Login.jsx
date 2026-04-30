import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false })
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

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
    <section className="login-page">
      <div className="site-container login-grid">
        <div className="login-panel">
          <div className="login-brand">Farm</div>
          <div className="login-copy">
            <h1>Start Your Day Fresh</h1>
            <p>
              Manage your deliveries and explore fresh dairy products, customize orders,
              update preferences, and enjoy farm-to-door freshness from our eco-conscious local farm.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="jane@gmail.com"
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

            <p className="login-footer">
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </p>
            {status && <p className="login-status">{status}</p>}
          </form>
        </div>

        <div className="login-visual" />
      </div>
    </section>
  )
}

