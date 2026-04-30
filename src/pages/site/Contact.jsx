import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((current) => ({
      ...current,
      [id]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('Sending message...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send message')
      }

      setStatus(result.message)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <p className="section-tag">Contact Us</p>
          <h1>Get in Touch with Omega</h1>
          <p>Tell us your requirements and our team will connect with you quickly.</p>
        </div>
      </section>

      <section className="section">
        <div className="site-container split-2">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send Message</h3>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="How can we help?"
              value={formData.message}
              onChange={handleChange}
            />

            <button className="btn btn-primary" type="submit">
              Submit Now
            </button>
            {status && <p className="contact-status">{status}</p>}
          </form>

          <div className="contact-card">
            <h3>Contact Info</h3>
            <p>45 Green Valley Road, Lahore, Pakistan</p>
            <p>+92 300 1112233</p>
            <p>hello@omegafarm.com</p>
            <div className="map-wrap">
              <iframe
                title="Omega Farm Location"
                src="https://maps.google.com/maps?q=Lahore&t=&z=12&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

