import { Link } from 'react-router-dom'
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

const brands = ['AgriCorp', 'Farmline', 'GreenMart', 'DairyHub', 'HarvestCo', 'FreshNest']

export default function About() {
  const images = useDatabaseImages()
  const aboutImageUrl = images['about.jpg']
  const aboutHeroImageUrl = images['about1.jpeg']

  return (
    <div className="about-template">
      <section
        className="services-breadcrumb about-breadcrumb"
        style={{ backgroundImage: aboutHeroImageUrl ? `url(${aboutHeroImageUrl})` : undefined }}
      >
        <div className="site-container services-breadcrumb-inner">
          <h1>About Us</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>About Us</span>
          </div>
        </div>
      </section>

      <section className="section about-template-top-intro">
        <div className="site-container about-template-top-intro-inner">
          <h2>Introduction</h2>
          <p>
            Omega Dairy (Pvt.) Ltd. is an international dairy brand delivering fresh, high-quality dairy products
            worldwide. Omega Dairy (Pvt.) Ltd. is a company registered in Pakistan (Under Companies Act 2017) for
            the purpose of Manufacturing, Producing and Dealing in Milk and related products.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="site-container about-template-story">
          <div className="about-template-intro">
            <div className="about-template-intro-copy">
              <h3>The Company Vision</h3>
              <p>
                To become a leading Company in the Dairy Farm sector by applying latest machinery, technology, methods
                and techniques.
              </p>
              <h3>The Company Mission</h3>
              <p>
                To produce premium quality Milk products using Improved production, cost effective, value addition and
                marketing innovations for multiple benefits.
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
              
            </div>
            <div className="about-template-image-wrap">
              <img src={aboutImageUrl || ''} alt="About Omega" />
              <button type="button" className="about-play-badge" aria-label="Play intro video">
                &#9654;
              </button>
            </div>
          </div>
          <div className="about-template-followup">
            <p>
                Omega Dairy is proud to be among the pioneers of rotary milking parlour technology in Pakistan,
                reinforcing our position as a forward-thinking, technology-driven dairy enterprise focused on
                productivity, precision, and animal welfare.
              </p>
            <p>
              Our global sourcing network connects us with trusted suppliers and partners from countries including
              Belgium, Turkey, Malaysia, United States, Netherlands, France, and Spain for feed ingredients, dairy
              additives, nutrition solutions, and advanced dairy technologies.
            </p>
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
          <img src={images['services.jpg'] || ''} alt="How we work" />
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
            <p>If you need a custom plan, our team can map a tailored model for your monthly or weekly demand.</p>
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
