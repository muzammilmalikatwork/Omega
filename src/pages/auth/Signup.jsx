import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((current) => ({
      ...current,
      [id]: value,
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
    setStatus('Creating account...')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await parseJsonResponse(response)
      if (!response.ok) {
        throw new Error(result.error || 'Unable to create account.')
      }

      setStatus(result.message)
      setTimeout(() => navigate('/login'), 1200)
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
            <h1>Create your Omega account</h1>
            <p>
              Register with your name and email to manage your deliveries, explore dairy
              products, and keep your farm preferences up to date.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary login-button" type="submit">
              Sign Up
            </button>

            <p className="login-footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
            {status && <p className="login-status">{status}</p>}
          </form>
        </div>

        <div className="login-visual" />
      </div>
    </section>
  )
}

