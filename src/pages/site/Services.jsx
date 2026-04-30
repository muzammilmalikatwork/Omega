import { Link } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const primaryServices = [
  {
    title: 'Agriculture Products',
    text: 'Seamlessly deliver quality-focused farm outputs with coordinated production and handling.',
    imageName: 'c.jpg',
  },
  {
    title: 'Fresh Vegetables',
    text: 'Fresh seasonal vegetables prepared for homes, stores, and commercial kitchens.',
    imageName: 'co.jpg',
  },
  {
    title: 'Organic Products',
    text: 'Naturally grown produce with careful soil and water practices for cleaner food.',
    imageName: 'about1.jpeg',
  },
  {
    title: 'Ecological Farming',
    text: 'Low-impact farming methods designed to preserve land quality over the long term.',
    imageName: 'services.jpg',
  },
  {
    title: 'Dairy Products',
    text: 'Milk, butter, and related dairy processed with strict hygiene and freshness checks.',
    imageName: 'about.jpg',
  },
  {
    title: 'Fresh Berries',
    text: 'Hand-selected berries handled for quality, texture, and timely market delivery.',
    imageName: 'cow.jpg',
  },
]

const secondaryServices = [
  {
    title: 'Top Quality Milk Products',
    text: 'Consistent dairy quality managed with monitoring from milking to distribution.',
    imageName: 'about.jpg',
  },
  {
    title: 'Natural Feeds For Cows',
    text: 'Balanced feed plans that support healthier livestock and better milk output.',
    imageName: 'cow.jpg',
  },
  {
    title: 'Hand Milking Cow Milk',
    text: 'Traditional care with modern hygiene standards for cleaner daily supply.',
    imageName: 'services.jpg',
  },
  {
    title: 'Healthy Herd Management',
    text: 'Routine veterinary checks and care planning to keep herds productive.',
    imageName: 'about1.jpeg',
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
  const images = useDatabaseImages()
  const servicesHeroImageUrl = images['services.jpg']

  return (
    <div className="services-template">
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: servicesHeroImageUrl ? `url(${servicesHeroImageUrl})` : undefined }}
      >
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
              <img src={images[service.imageName] || ''} alt={service.title} />
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
                <img src={images[service.imageName] || ''} alt={service.title} />
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

