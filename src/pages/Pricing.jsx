import { Link } from 'react-router-dom'

const pricingHeroImage =
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80'

const plans = [
  {
    name: 'Basic',
    price: '$150',
    period: '/ month',
    description: 'A simple plan for small daily farm and dairy needs.',
    features: [
      'Fresh produce for small orders',
      'Weekly dairy delivery',
      'Standard support',
      'Basic quality checks',
      'Flexible monthly plan',
    ],
  },
  {
    name: 'Standard',
    price: '$200',
    period: '/ month',
    description: 'Balanced package for growing homes, stores, and kitchens.',
    featured: true,
    features: [
      'Daily farm and dairy supply',
      'Priority order processing',
      'Expanded product range',
      'Improved delivery window',
      'Dedicated support line',
    ],
  },
  {
    name: 'Unlimited',
    price: '$350',
    period: '/ month',
    description: 'Best choice for businesses with high and steady demand.',
    features: [
      'Bulk delivery capacity',
      'Custom supply planning',
      'Fast-track fulfillment',
      'Advanced quality reports',
      'Account manager support',
    ],
  },
]

export default function Pricing() {
  return (
    <>
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${pricingHeroImage})` }}>
        <div className="site-container services-breadcrumb-inner">
          <h1>Pricing</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Pricing</span>
          </div>
        </div>
      </section>

      <section className="section pricing-layout">
        <div className="site-container pricing-showcase-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={`pricing-plan-card ${plan.featured ? 'featured' : ''}`}>
              <h3>{plan.name}</h3>
              <p className="pricing-plan-price">
                {plan.price}
                <span>{plan.period}</span>
              </p>
              <p className="pricing-plan-desc">{plan.description}</p>
              <hr />
              <ul className="pricing-plan-list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span>{feature}</span>
                    <span aria-hidden="true">✓</span>
                  </li>
                ))}
              </ul>
              <button className={`pricing-plan-btn ${plan.featured ? 'accent' : ''}`} type="button">
                Join Now <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
