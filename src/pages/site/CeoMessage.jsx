import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

export default function CeoMessage() {
  const images = useDatabaseImages()
  const ceoImageUrl = images['team1.jpeg'] || images['team.webp'] || images['about.jpg']

  return (
    <div className="ceo-message-page">
      <section className="section ceo-message-section">
        <div className="site-container">
          <article className="ceo-message-card">
            <div className="ceo-message-copy">
              <p className="ceo-message-kicker">CEO MESSAGE</p>
              <h2>Welcome to our company.</h2>
              <span className="ceo-message-rule" aria-hidden="true" />

              <p>
                At the heart of Omega Dairy is a commitment to quality, innovation, and trust. Since the beginning,
                our goal has been simple: to deliver reliable solutions that create real value for our clients while
                maintaining the highest standards of service.
              </p>
              <p>
                We understand that every customer has unique needs. That is why we focus on providing tailored
                solutions that not only meet expectations but exceed them. Our team works with dedication, integrity,
                and a strong sense of responsibility to ensure every project is handled with care and precision.
              </p>
              <p>
                As we continue to grow, we remain focused on building long-term relationships, embracing new
                technologies, and improving our services to serve you better. Your trust motivates us to keep pushing
                forward and setting higher benchmarks.
              </p>
              <p className="ceo-message-thanks">Thank you for choosing us and being part of our journey.</p>

              <div className="ceo-message-signoff">
                <span className="ceo-message-signature" aria-hidden="true">
                  John Doe
                </span>
                <strong>John Doe</strong>
                <span>Chief Executive Officer</span>
              </div>
            </div>

            <div className="ceo-message-visual">
              <img src={ceoImageUrl || ''} alt="Chief Executive Officer" />
            
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
