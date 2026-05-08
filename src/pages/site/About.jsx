import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const testimonials = [
  {
    name: 'Jina Nilson',
    role: 'Client',
    quote:
      'Omega keeps product quality and delivery timing consistent. Their team is responsive and easy to coordinate with.',
    imageName: 'team1.jpeg',
  },
  {
    name: 'Braitly Dcosta',
    role: 'Client',
    quote:
      'We shifted our recurring supply to Omega and saw immediate improvement in freshness and reliability.',
    imageName: 'team2.jpeg',
  },
  {
    name: 'Amna Raza',
    role: 'Retail Partner',
    quote:
      'From planning to final dispatch, their process is transparent and professional. Highly recommended.',
    imageName: 'team3.jpeg',
  },
]

const missionVisionCards = [
  {
    title: 'Our Mission',
    text: 'To become a leading Company in the Dairy Farm sector by applying latest machinery, technology, methods and techniques.',
  },
  {
    title: 'Our Vision',
    text: 'To produce premium quality Milk products using Improved production, cost effective, value addition and marketing innovations for multiple benefits.',
  },
]

const valuesCards = [
  {
    title: 'Innovation',
    text: 'We continuously improve our dairy operations through smarter systems, modern equipment, and practical solutions that meet evolving market needs.',
  },
  {
    title: 'Excellence',
    text: 'We are committed to delivering premium quality products and dependable service through consistency, precision, and strong performance in every process.',
  },
  {
    title: 'Integrity',
    text: 'We conduct our business with honesty, transparency, and ethical standards, building long-term trust with our clients and partners.',
  },
  {
    title: 'Customer Focus',
    text: 'Our customers are at the center of everything we do. We listen, understand, and respond with dependable products and dedicated support.',
  },
  {
    title: 'Collaboration',
    text: 'We believe in teamwork across our organization and with our partners to achieve shared success, stronger operations, and lasting impact.',
  },
  {
    title: 'Compliance',
    text: 'We ensure our operations align with quality requirements, regulations, and industry standards to deliver confidence and peace of mind.',
  },
]

const team = [
  {
    name: 'Mr. Hanif Abdani',
    role: 'Director',
    imageName: 'team1.jpeg',
  },
  {
    name: 'Mr. Shamoil Abdani',
    role: 'Director Lead',
    imageName: 'team2.jpeg',
  },
  {
    name: 'Mr. Abdul Qadir',
    role: 'Director',
    imageName: 'team3.jpeg',
  },
  {
    name: 'Mr. Ilyas Asif',
    role: 'Director',
    imageName: 'team1.jpeg',
  },
]

const steps = [
  {
    title: 'Planning And Forecasting',
    text: 'We map seasonal demand, production goals, and operational timelines before execution.',
  },
  {
    title: 'Quality-Centered Operations',
    text: 'Every stage includes checks for hygiene, freshness, and process consistency.',
  },
  {
    title: 'Reliable Delivery',
    text: 'Structured logistics ensure timely dispatch and stable supply for recurring clients.',
  },
]

const introPillars = [
  { title: 'Trusted', label: 'Partnerships', icon: 'leaf' },
  { title: 'Global', label: 'Sourcing', icon: 'globe' },
  { title: 'Premium', label: 'Quality', icon: 'shield' },
  { title: 'Animal', label: 'Welfare', icon: 'cow' },
  { title: 'Technology', label: 'Driven', icon: 'gear' },
]

function AboutIcon({ icon }) {
  if (icon === 'leaf') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.5 4.5c-5.2.4-8.8 2.6-10.9 6.5C6 14 6.2 17 7.5 19.5c2.5-1.2 5.2-3.4 6.8-6.2 1.4-2.4 1.9-4.9 1.9-8.8 1 .8 1.7 1.9 2.3 3.2.8 1.9.9 4.1.4 6.2-.8 3.2-3.1 6.1-6.4 8.1" />
      </svg>
    )
  }

  if (icon === 'globe') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-6.1 5h12.2M5.9 15.5h12.2M12 3.8c2.1 2.2 3.2 5.1 3.2 8.2S14.1 18 12 20.2M12 3.8C9.9 6 8.8 8.9 8.8 12s1.1 6 3.2 8.2" />
      </svg>
    )
  }

  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.8 5.5 6.2v5.4c0 4.2 2.5 6.8 6.5 8.6 4-1.8 6.5-4.4 6.5-8.6V6.2L12 3.8Zm0 4.1v8.1m-3.3-4h6.6" />
      </svg>
    )
  }

  if (icon === 'cow') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7.2 4.8 5.8 4 8.7l1.4 1.4v4.1c0 2.7 2.2 4.8 4.8 4.8h3.6c2.7 0 4.8-2.2 4.8-4.8v-4.1L20 8.7l-.8-2.9L17 7.2H7Zm2.2 4.1h.1m5.4 0h.1M10 14.8c.5.5 1.2.8 2 .8s1.5-.3 2-.8" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5v3m0 9v3m7.5-7.5h-3m-9 0h-3m10.3-4.8 2.1-2.1M7.1 16.9 5 19m0-14 2.1 2.1m9.7 9.7 2.1 2.1M12 8.3A3.7 3.7 0 1 0 12 15.7 3.7 3.7 0 0 0 12 8.3Z" />
    </svg>
  )
}

export default function About() {
  const images = useDatabaseImages()
  const aboutImageUrl = images['about.jpg']
  const aboutHeroImageUrl = images['about1.jpeg']
  const aboutStepsImageUrl = images['healthyherdmanagment.jpg'] || images['services.jpg']

  return (
    <div className="about-template">
      <section
        className="services-breadcrumb about-breadcrumb"
        style={{ backgroundImage: aboutHeroImageUrl ? `url(${aboutHeroImageUrl})` : undefined }}
      >
        <div className="site-container services-breadcrumb-inner">
          <h1>About Us</h1>
          
        </div>
      </section>

      <section className="section">
        <div className="site-container about-template-story">
          <div className="about-template-intro">
            <div className="about-template-intro-copy">
              <p className="about-template-intro-kicker">Introduction</p>
              <h2>
                Growing a Healthier World
                <br />
                with Every Drop
              </h2>
              <span className="about-template-intro-divider" aria-hidden="true" />
              <p>
                Omega Dairy (Pvt.) Ltd. is an international dairy brand delivering fresh, high-quality dairy products
                worldwide. Omega Dairy (Pvt.) Ltd. is a company registered in Pakistan (Under Companies Act 2017) for
                the purpose of Manufacturing, Producing and Dealing in Milk and related products.
              </p>
              <p>
                Today, Omega Dairy stands among Pakistan&apos;s largest raw milk producers. Our two fully operational
                farms, each spread across 50 acres, house a total herd of 11,000 cattle, including 4,600 milking
                animals, producing approximately 160,000 litres of milk daily.
              </p>
              <p>
                Our third flagship farm, currently under construction on 80 acres, represents the next phase of growth
                and innovation. Equipped with the latest DeLaval Rotary Milking Parlour technology, this farm will
                feature the largest 80-bail rotary parlour in Pakistan, with the capacity to milk 3,400 animals,
                setting a new benchmark for efficiency and large-scale dairy operations.
              </p>
              <p>
                Omega Dairy is proud to be among the pioneers of rotary milking parlour technology in Pakistan,
                reinforcing our position as a forward-thinking, technology-driven dairy enterprise focused on
                productivity, precision, and animal welfare.
              </p>
            </div>
            <div className="about-template-image-wrap about-template-image-wrap--editorial">
              <img src={aboutImageUrl || ''} alt="About Omega" />
              <div className="about-template-image-note" role="note">
                <strong>Rooted in Pakistan.</strong>
                <span>Committed to the World.</span>
              </div>
              <div className="about-play-badge" aria-label="Omega Dairy established in 2021" role="note">
                <small>Since</small>
                <span>2021</span>
                <i aria-hidden="true">
                  <AboutIcon icon="leaf" />
                </i>
              </div>
            </div>
          </div>
          <div className="about-template-followup about-template-network-strip">
            <article className="about-template-network-card">
              <span className="about-template-network-icon" aria-hidden="true">
                <AboutIcon icon="globe" />
              </span>
              <div>
                <h3>Our Global Network</h3>
                <p>
                  Our global sourcing network connects us with trusted suppliers and partners from countries including
                  Belgium, Turkey, Malaysia, United States, Netherlands, France, and Spain for feed ingredients, dairy
                  additives, nutrition solutions, and advanced dairy technologies.
                </p>
              </div>
            </article>
            <div className="about-template-pillar-grid" aria-label="Omega strengths">
              {introPillars.map((item) => (
                <article key={item.label} className="about-template-pillar-card">
                  <span className="about-template-pillar-icon" aria-hidden="true">
                    <AboutIcon icon={item.icon} />
                  </span>
                  <strong>{item.title}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-template-mission-section">
        <div className="site-container about-template-mission-shell">
          <div className="section-heading center about-template-mission-head">
            <p className="section-tag">Our Mission</p>
            <h2>What We Stand For</h2>
            <span className="about-template-mission-divider" aria-hidden="true" />
          </div>
          <div className="about-template-mission-grid">
            {missionVisionCards.map((item) => (
              <article key={item.title} className="about-template-mission-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-template-values-section">
        <div className="site-container about-template-values-shell">
          <div className="section-heading center about-template-values-head">
            <p className="section-tag">Our Values</p>
            <h2>The Principles That Guide Us</h2>
            <span className="about-template-values-divider" aria-hidden="true" />
          </div>
          <div className="about-template-values-grid">
            {valuesCards.map((item) => (
              <article key={item.title} className="about-template-values-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-template-testimonials">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Our Testimonial</p>
            <h2>What Our Clients Says</h2>
          </div>
          <div className="about-template-testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="about-template-testimonial-card">
                <div className="author">
                  <img src={images[item.imageName] || ''} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.role}</span>
                  </div>
                </div>
                <p>{item.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container about-template-steps">
          <img src={aboutStepsImageUrl || ''} alt="How we work" />
          <div>
            <p className="section-tag">Our Steps</p>
            <h2>How We Work On Quality</h2>
            <div className="about-step-list">
              {steps.map((step) => (
                <article key={step.title} className="about-step-item">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-bg about-template-team-section">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Directors</p>
            <h2>Authorized Person</h2>
          </div>
          <div className="about-template-team-grid">
            {team.map((member) => (
              <article key={member.name} className="about-template-team-card">
                <img src={images[member.imageName] || ''} alt={member.name} />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
