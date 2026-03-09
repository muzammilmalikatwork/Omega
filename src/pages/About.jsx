import { Link } from 'react-router-dom'
import aboutImage from '../../image/about.jpg'
import aboutHeroImage from '../../image/about1.jpeg'

const testimonials = [
  {
    name: 'Jina Nilson',
    role: 'Client',
    quote:
      'Omega keeps product quality and delivery timing consistent. Their team is responsive and easy to coordinate with.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Braitly Dcosta',
    role: 'Client',
    quote:
      'We shifted our recurring supply to Omega and saw immediate improvement in freshness and reliability.',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    name: 'Amna Raza',
    role: 'Retail Partner',
    quote:
      'From planning to final dispatch, their process is transparent and professional. Highly recommended.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
]

const faqs = [
  {
    q: '01 Do you provide both farm and dairy products?',
    a: 'Yes. We provide a combined service model for agriculture produce and dairy-based supply.',
  },
  {
    q: '02 Can orders be customized for business needs?',
    a: 'Yes. We can plan supply by volume, frequency, and product category based on your operations.',
  },
  {
    q: '03 How do you ensure freshness?',
    a: 'We follow strict quality checks, controlled handling, and scheduled delivery workflows.',
  },
]

const team = [
  {
    name: 'Howard Holmes',
    role: 'CEO & Founder',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ella Thompson',
    role: 'Operations Lead',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vincent Cooper',
    role: 'Quality Manager',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Danielle Bryant',
    role: 'Supply Coordinator',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
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

const brands = ['AgriCorp', 'Farmline', 'GreenMart', 'DairyHub', 'HarvestCo', 'FreshNest']

export default function About() {
  return (
    <div className="about-template">
      <section className="services-breadcrumb about-breadcrumb" style={{ backgroundImage: `url(${aboutHeroImage})` }}>
        <div className="site-container services-breadcrumb-inner">
          <h1>About Us</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>About Us</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container about-template-intro">
          <div>
            <p className="section-tag">About Us</p>
            <h2>We Have Been Milk Harvesting</h2>
            <p>
              Omega has been building dependable agriculture and dairy operations with a strong focus on quality,
              hygiene, and long-term sustainability.
            </p>
            <p>
              Our team combines practical field experience with modern planning to deliver products that meet daily
              household and business requirements.
            </p>
          </div>
          <div className="about-template-image-wrap">
            <img src={aboutImage} alt="About Omega" />
            <button type="button" className="about-play-badge" aria-label="Play intro video">
              ▶
            </button>
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
                  <img src={item.image} alt={item.name} />
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
        <div className="site-container services-template-faq">
          <div>
            {faqs.map((item, idx) => (
              <details key={item.q} className="services-faq-item" open={idx === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <div className="services-faq-copy">
            <p className="section-tag">Our FAQ</p>
            <h2>Get every single answer here.</h2>
            <p>
              We keep communication clear so you can understand production standards, sourcing quality, and delivery
              commitments.
            </p>
            <p>
              If you need a custom plan, our team can map a tailored model for your monthly or weekly demand.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container about-template-steps">
          <img
            src="https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1400&q=80"
            alt="How we work"
          />
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

      <section className="section alt-bg">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Team Members</p>
            <h2>Our Dedicated Team</h2>
          </div>
          <div className="about-template-team-grid">
            {team.map((member) => (
              <article key={member.name} className="about-template-team-card">
                <img src={member.image} alt={member.name} />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-brand-strip">
        <div className="site-container services-brand-row">
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
