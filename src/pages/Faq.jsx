const faqs = [
  {
    q: 'How fresh are Omega dairy products?',
    a: 'Our dairy items are processed daily and delivered through a controlled local supply chain.',
  },
  {
    q: 'Do you support bulk business orders?',
    a: 'Yes. We provide custom pricing and schedules for retail stores, cafes, and restaurants.',
  },
  {
    q: 'Can I customize my weekly supply package?',
    a: 'Yes. You can choose product mix, quantities, and preferred delivery days.',
  },
  {
    q: 'Do you provide farm consultation as a service?',
    a: 'Yes. Omega experts support irrigation planning, livestock care, and dairy setup guidance.',
  },
]

export default function Faq() {
  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <p className="section-tag">FAQ</p>
          <h1>Frequently Asked Questions</h1>
          <p>Quick answers about Omega products, deliveries, and service options.</p>
        </div>
      </section>

      <section className="section">
        <div className="site-container faq-list">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
