import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

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
  { label: 'Chicken Farm', imageName: 'b-logo1.png' },
  { label: 'Milk Farm', imageName: 'b-logo2.png' },
  { label: 'Family Farm', imageName: 'b-logo3.png' },
  { label: 'Farm Meat', imageName: 'b-logo4.png' },
  { label: 'Goose Farm', imageName: 'b-logo5.png' },
]

export default function Faq() {
  const [faqLogoIndex, setFaqLogoIndex] = useState(0)
  const images = useDatabaseImages()
  const faqHeroImage = images['about1.jpeg']
  const faqMediaImage = images['about.jpg']

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
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: faqHeroImage ? `url(${faqHeroImage})` : undefined }}
      >
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
            <img src={faqMediaImage || ''} alt="Farmer holding fresh vegetables in field" />
            <button type="button" aria-label="Play video preview">
              
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
              <img src={images[item.imageName] || ''} alt={item.label} />
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

