import { Link } from 'react-router-dom'
import servicesHeroImage from '../../image/services.jpg'

const primaryServices = [
  {
    title: 'Agriculture Products',
    text: 'Seamlessly deliver quality-focused farm outputs with coordinated production and handling.',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Fresh Vegetables',
    text: 'Fresh seasonal vegetables prepared for homes, stores, and commercial kitchens.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Organic Products',
    text: 'Naturally grown produce with careful soil and water practices for cleaner food.',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Ecological Farming',
    text: 'Low-impact farming methods designed to preserve land quality over the long term.',
    image:
      'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Dairy Products',
    text: 'Milk, butter, and related dairy processed with strict hygiene and freshness checks.',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Fresh Berries',
    text: 'Hand-selected berries handled for quality, texture, and timely market delivery.',
    image:
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80',
  },
]

const secondaryServices = [
  {
    title: 'Top Quality Milk Products',
    text: 'Consistent dairy quality managed with monitoring from milking to distribution.',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Natural Feeds For Cows',
    text: 'Balanced feed plans that support healthier livestock and better milk output.',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Hand Milking Cow Milk',
    text: 'Traditional care with modern hygiene standards for cleaner daily supply.',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Healthy Herd Management',
    text: 'Routine veterinary checks and care planning to keep herds productive.',
    image:
      'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1200&q=80',
  },
]

const faqs = [
  {
    question: '01 What makes Omega service quality consistent?',
    answer:
      'Our process is built to keep quality stable while meeting demand. We coordinate farm output, processing, and logistics as one system.',
  },
  {
    question: '02 Can you handle recurring bulk supply orders?',
    answer:
      'Yes. We provide recurring supply cycles and can adapt quantities based on seasonal or business requirements.',
  },
  {
    question: '03 How do you control quality before delivery?',
    answer:
      'Quality checks are embedded at each stage including production, handling, and delivery before final dispatch.',
  },
]

const brands = [
  'AgriCorp',
  'Farmline',
  'GreenMart',
  'DairyHub',
  'HarvestCo',
  'FreshNest',
]

export default function Services() {
  return (
    <div className="services-template">
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${servicesHeroImage})` }}>
        <div className="site-container services-breadcrumb-inner">
          <h1>Service</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Service</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container services-template-grid">
          {primaryServices.map((service) => (
            <article key={service.title} className="services-template-card">
              <img src={service.image} alt={service.title} />
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section services-template-secondary">
        <div className="site-container">
          <div className="services-template-head">
            <div>
              <p className="section-tag">Our Services</p>
              <h2>What We Provide</h2>
            </div>
            <Link to="/contact" className="btn btn-primary">
              View All Services
            </Link>
          </div>

          <div className="services-template-row">
            {secondaryServices.map((service) => (
              <article key={service.title} className="services-template-card small">
                <img src={service.image} alt={service.title} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
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
              <details key={item.question} className="services-faq-item" open={idx === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="services-faq-copy">
            <p className="section-tag">Our FAQ</p>
            <h2>Get every single answer here.</h2>
            <p>
              We keep our service model transparent so your team can plan procurement and delivery with confidence.
            </p>
            <p>
              From product consistency to delivery timing, Omega operations are structured for recurring business needs.
            </p>
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
