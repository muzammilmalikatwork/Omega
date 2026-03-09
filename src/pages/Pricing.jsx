const plans = [
  {
    name: 'Starter',
    price: 'Rs 18,000',
    period: '/month',
    features: ['Weekly dairy supply', 'Basic produce package', 'Standard delivery'],
  },
  {
    name: 'Business',
    price: 'Rs 45,000',
    period: '/month',
    featured: true,
    features: ['Daily dairy supply', 'Expanded produce range', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Bulk contract delivery', 'Custom quality reports', 'Dedicated account manager'],
  },
]

export default function Pricing() {
  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <p className="section-tag">Pricing</p>
          <h1>Flexible Plans For Every Need</h1>
          <p>Choose a package that fits your household, retail outlet, or business supply requirements.</p>
        </div>
      </section>

      <section className="section alt-bg">
        <div className="site-container cards-3 pricing-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={`price-card ${plan.featured ? 'featured' : ''}`}>
              <h3>{plan.name}</h3>
              <p className="price">
                {plan.price}
                <span>{plan.period}</span>
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="btn btn-primary" type="button">
                Choose Plan
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
