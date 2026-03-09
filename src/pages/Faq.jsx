import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import brandLogo1 from '../../image/b-logo1.png'
import brandLogo2 from '../../image/b-logo2.png'
import brandLogo3 from '../../image/b-logo3.png'
import brandLogo4 from '../../image/b-logo4.png'
import brandLogo5 from '../../image/b-logo5.png'

const faqHeroImage =
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80'

const faqs = [
  {
    q: '01 How do you keep products fresh during delivery?',
    a: 'We use cold-chain handling, quick dispatch windows, and route-based delivery checks to maintain freshness from farm to customer.',
  },
  {
    q: '02 Can I place recurring monthly supply orders?',
    a: 'Yes. We support recurring plans for homes, stores, and restaurants with adjustable quantities each cycle.',
  },
  {
    q: '03 Do you provide custom farm and dairy packages?',
    a: 'Yes. You can select product mix, volume, and delivery frequency based on your exact business or household needs.',
  },
  {
    q: '04 How fast can you start a new business account?',
    a: 'Most business accounts are activated quickly after requirement review, package setup, and delivery route confirmation.',
  },
  {
    q: '05 Do you offer support for farm planning and livestock care?',
    a: 'Yes. Our team can guide field planning, feed schedules, and herd care practices for more stable output.',
  },
]

const faqLogos = [
  { label: 'Chicken Farm', image: brandLogo1 },
  { label: 'Milk Farm', image: brandLogo2 },
  { label: 'Family Farm', image: brandLogo3 },
  { label: 'Farm Meat', image: brandLogo4 },
  { label: 'Goose Farm', image: brandLogo5 },
]

export default function Faq() {
  const [faqLogoIndex, setFaqLogoIndex] = useState(0)

  const visibleFaqLogos = useMemo(
    () => Array.from({ length: 4 }, (_, offset) => faqLogos[(faqLogoIndex + offset) % faqLogos.length]),
    [faqLogoIndex]
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFaqLogoIndex((currentIndex) => (currentIndex + 1) % faqLogos.length)
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <>
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${faqHeroImage})` }}>
        <div className="site-container services-breadcrumb-inner">
          <h1>Faq</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Faq</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container faq-layout">
          <div className="faq-media">
            <img
              src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1000&q=80"
              alt="Farmer holding fresh vegetables in field"
            />
            <button type="button" aria-label="Play video preview">
              >
            </button>
          </div>

          <div className="faq-accordion">
            {faqs.map((item, idx) => (
              <details key={item.q} className="faq-accordion-item" open={idx === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span aria-hidden="true">{idx === 0 ? 'v' : '<'}</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery-brand-strip team-brand-strip">
        <div className="site-container team-brand-row">
          {visibleFaqLogos.map((item, index) => (
            <article key={`${item.label}-${index}`} className="gallery-brand-mark team-brand-mark">
              <img src={item.image} alt={item.label} />
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
