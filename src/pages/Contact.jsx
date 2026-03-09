export default function Contact() {
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
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <h3>Send Message</h3>
            <label htmlFor="name">Full Name</label>
            <input id="name" type="text" placeholder="Your full name" />

            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="name@example.com" />

            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="How can we help?" />

            <button className="btn btn-primary" type="submit">
              Submit Now
            </button>
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
