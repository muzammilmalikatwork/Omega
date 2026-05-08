import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '8K+', label: 'Acres Cultivated' },
  { value: '12K+', label: 'Happy Customers' },
  { value: '150+', label: 'Expert Farmers' },
]

const services = [
  {
    title: 'Unit 1',
    text: 'Season-based farming with smart planning and controlled irrigation.',
    imageName: 'c.jpg',
  },
  {
    title: 'Unit 2',
    text: 'Fresh milk, butter, and yogurt processed with strict hygiene standards.',
    imageName: 'co.jpg',
  },
  {
    title: 'Unit 3',
    text: 'Healthy feed programs, shelter maintenance, and regular veterinary checks.',
    imageName: 'cow.jpg',
  },
]

const members = [
  { name: 'Unilever', imageName: 'unilever.png', href: 'https://www.unilever.pk/' },
  { name: 'Haleeb', imageName: 'haleeb.jpeg', href: 'https://haleebfoods.com/' },
  { name: 'Pakola', imageName: 'pakola.png', href: 'https://pakola.com.pk/' },
  { name: 'Nestle', imageName: 'nestle.png', href: 'https://www.nestle.pk/' },
  { name: 'Dalda', imageName: 'dalda.png', href: 'https://www.daldafoods.com/' },
  { name: 'Gourmet Foods', imageName: 'gourment.png', href: 'https://www.gourmetfoods.pk/' },
  { name: "Adam's", imageName: 'adams.jpeg', href: 'https://www.adams.pk/' },
  { name: 'Fauji Foods', imageName: 'fauji.png', href: 'https://www.faujifoods.com/' },
  { name: 'Dairyland', imageName: 'dairyland.jpeg', href: 'https://www.dairylandltd.com/' },
  { name: 'FrieslandCampina', imageName: 'fries.png', href: 'https://www.frieslandcampina.com/pk/' },
  { name: 'Tetra Pak', imageName: 'tetra.jpeg', href: 'https://www.tetrapak.com/en-pk' },
  { name: 'Shakarganj', imageName: 'shak.png', href: 'https://shakarganjfood.com/' },
]

function resolveMemberLogoSrc(member, imageUrls) {
  const logo = String(member.logo || '').trim()
  if (/^(https?:\/\/|\/uploads\/|data:)/i.test(logo)) return logo
  if (logo) return imageUrls[logo] || ''
  return imageUrls[member.imageName] || ''
}

function resolveHeroSlideImage(slide, imageUrls, fallbackImage) {
  return imageUrls[slide.imageName] || imageUrls[slide.fallbackImageName] || fallbackImage || ''
}

const products = [
  {
    title: 'Fresh Milk',
    text: 'Daily collection with cold-chain quality checks.',
    imageName: 'frehmilk.jpg',
    fallbackImageName: 'about.jpg',
  },
  {
    title: 'Organic Vegetables',
    text: 'Farm-fresh vegetables harvested and packed daily.',
    imageName: 'organicveg.jpg',
    fallbackImageName: 'co.jpg',
  },
  {
    title: 'Natural Butter',
    text: 'Pure dairy butter made from quality cream.',
    imageName: 'naturalbutter.jpg',
    fallbackImageName: 'services.jpg',
  },
  {
    title: 'Healthy Feed',
    text: 'Balanced nutrition for stronger livestock growth.',
    imageName: 'healthyfeed.jpg',
    fallbackImageName: 'cow.jpg',
  },
]

const testimonials = [
  {
    name: 'Ayesha Khan',
    role: 'Retail Partner',
    quote: 'Consistent quality and reliable delivery every week. Omega is a trusted supplier for our store.',
  },
  {
    name: 'Usman Tariq',
    role: 'Restaurant Owner',
    quote: 'Their fresh dairy and produce helped us improve customer satisfaction and kitchen consistency.',
  },
]

const posts = [
  {
    title: 'How Smart Irrigation Improves Farm Output',
    text: 'Learn practical water-saving methods for sustainable productivity.',
  },
  {
    title: 'Dairy Hygiene Basics for Better Milk Quality',
    text: 'A quick checklist used by modern dairy farms.',
  },
  {
    title: 'From Harvest to Delivery: Quality Workflow',
    text: 'How Omega keeps products fresh during handling and transport.',
  },
]

const heroHighlights = ['Cloud-ready workflows', 'Cold-chain precision', 'Scalable farm operations']
const heroParticles = Array.from({ length: 14 }, (_, index) => index)
const heroSlides = [
  {
    eyebrow: 'Dairy Operations',
    title: 'Omega Dairy Solutions Built For Modern Farm Operations',
    text: 'Empowering dairy and agriculture teams with cleaner workflows, quality-led production, and scalable systems that support modern farm growth.',
    imageName: 'about.jpg',
    fallbackImageName: 'about1.jpeg',
    capability: 'Cold-chain visibility · Farm process control · Quality systems',
    footer: 'Healthcare-style clarity for dairy workflows',
    ctaLabel: 'Explore Home',
    ctaPath: '/',
  },
  {
    eyebrow: 'Processing Unit 01',
    title: 'Pure Milk Processing Plant',
    text: 'Stainless-steel pasteurization, homogenization, and chilled storage engineered for consistent quality from collection to dispatch.',
    imageName: 'frehmilk.jpg',
    fallbackImageName: 'about1.jpeg',
    capability: 'Pasteurization · Homogenization · Cold Storage',
    footer: 'ISO-grade hygiene standards',
    ctaLabel: 'Visit Unit 1',
    ctaPath: '/unit-1',
  },
  {
    eyebrow: 'Processing Unit 02',
    title: 'Feed & Silo Operations',
    text: 'Integrated grain silos and cattle feed lines that secure nutrition, traceability, and efficiency at industrial scale.',
    imageName: 'healthyfeed.jpg',
    fallbackImageName: 'cow.jpg',
    capability: 'Silos · Cattle feed · Bulk logistics',
    footer: 'Engineered for industrial throughput',
    ctaLabel: 'Visit Unit 2',
    ctaPath: '/unit-2',
  },
  {
    eyebrow: 'Processing Unit 03',
    title: 'Unit 3',
    text: 'Automated filling, capping, and labelling lines delivering market-ready dairy with precision and speed.',
    imageName: 'naturalbutter.jpg',
    fallbackImageName: 'services.jpg',
    capability: 'Automated bottling · Labelling · Dispatch',
    footer: 'Speed without compromising quality',
    ctaLabel: 'Visit Unit 3',
    ctaPath: '/unit-3',
  },
  {
    eyebrow: 'Head Office',
    title: 'Lahore Corporate Office',
    text: 'Our strategic HQ in Lahore where leadership, partnerships, and innovation come together to power every plant nationwide.',
    imageName: 'services.jpg',
    fallbackImageName: 'about.jpg',
    capability: 'Visit us · Lahore HQ · Pakistan',
    footer: 'Where strategy meets execution',
    ctaLabel: 'Contact Office',
    ctaPath: '/contact',
  },
]
const capabilityPillars = [
  {
    category: 'Dairy',
    theme: 'dairy',
    label: 'Intelligent Dairy Operations',
    text: 'Cold-chain discipline, herd planning, and process visibility designed for dependable output.',
    metric: '99.4%',
    metricLabel: 'Uptime',
  },
  {
    category: 'Agri',
    theme: 'agri',
    label: 'Agriculture With Systems Thinking',
    text: 'Irrigation, crop flow, and equipment readiness aligned around sustainable farm performance.',
    metric: '8K+',
    metricLabel: 'Acres',
  },
  {
    category: 'Supply',
    theme: 'supply',
    label: 'Partnership-Ready Supply',
    text: 'Structured delivery, quality controls, and partner trust built into daily operations.',
    metric: '1200+',
    metricLabel: 'Partners',
  },
]

const aboutHighlights = [
  {
    icon: 'air',
    text: 'Advanced ventilation systems for animal comfort.',
  },
  {
    icon: 'gene',
    text: 'Genomic testing for superior heifer selection.',
  },
  {
    icon: 'lab',
    text: 'Feed testing through internationally recognized nutrition labs.',
  },
  {
    icon: 'cycle',
    text: 'Manure fiber separation technology.',
  },
  {
    icon: 'water',
    text: 'Water and sand recycling for environmental sustainability.',
  },
  {
    icon: 'shield',
    text: 'Trusted relationships with major dairy processors and food brands.',
  },
]

const productSlides = [...products, ...products]

export default function Home() {
  const navigate = useNavigate()
  const imageUrls = useDatabaseImages()
  const homeHeroImage = imageUrls['about1.jpeg']
  const homeAboutImage = imageUrls['dailycattlecare.jpg'] || imageUrls['about.jpg']
  const [dbMembers, setDbMembers] = useState([])
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const [productsPaused, setProductsPaused] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function loadMembers() {
      try {
        const response = await fetch('/api/members')
        const result = await response.json()
        if (!response.ok || !result.success || cancelled) return

        setDbMembers(
          result.members.map((member) => ({
            id: member.id,
            name: member.company_name,
            href: member.website_url,
            logo: member.logo,
            status: member.status,
          })),
        )
      } catch {
        // Keep homepage members working with the built-in fallback list.
      }
    }

    loadMembers()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      root.style.setProperty('--pointer-x', '50%')
      root.style.setProperty('--pointer-y', '20%')
      return undefined
    }

    let frame = 0

    const updatePointer = (event) => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        root.style.setProperty('--pointer-x', `${Math.max(0, Math.min(100, x))}%`)
        root.style.setProperty('--pointer-y', `${Math.max(0, Math.min(100, y))}%`)
      })
    }

    const resetPointer = () => {
      root.style.setProperty('--pointer-x', '50%')
      root.style.setProperty('--pointer-y', '20%')
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerleave', resetPointer)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerleave', resetPointer)
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || heroPaused) return undefined

    const intervalId = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length)
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [heroPaused])

  useEffect(() => {
    if (productsPaused) return undefined

    const intervalId = window.setInterval(() => {
      setActiveProductIndex((current) => (current + 1) % products.length)
    }, 2600)

    return () => window.clearInterval(intervalId)
  }, [productsPaused])

  const displayedMembers = dbMembers.length > 0 ? dbMembers : members
  const activeHero = heroSlides[activeHeroIndex]

  const showPreviousHero = () => {
    setActiveHeroIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }

  const showNextHero = () => {
    setActiveHeroIndex((current) => (current + 1) % heroSlides.length)
  }

  return (
    <div ref={rootRef} className="home-clean home-vfx-shell home-sahat-shell">
      <section
        className="home-hero"
        aria-roledescription="carousel"
        aria-label="Omega homepage highlights"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        onFocusCapture={() => setHeroPaused(true)}
        onBlurCapture={() => setHeroPaused(false)}
      >
        <div className="home-hero-vfx" aria-hidden="true">
          <div className="home-hero-orbit home-hero-orbit--one" />
          <div className="home-hero-orbit home-hero-orbit--two" />
          <div className="home-hero-glow home-hero-glow--one" />
          <div className="home-hero-glow home-hero-glow--two" />
          {heroParticles.map((particle) => (
            <span key={particle} className="home-hero-particle" />
          ))}
        </div>
        <button
          type="button"
          className="home-hero-side-control home-hero-side-control--left"
          aria-label="Previous hero slide"
          onClick={showPreviousHero}
        >
          <span />
        </button>
        <button
          type="button"
          className="home-hero-side-control home-hero-side-control--right"
          aria-label="Next hero slide"
          onClick={showNextHero}
        >
          <span />
        </button>
        <div className="site-container home-hero-grid">
          <div key={`hero-copy-${activeHeroIndex}`} className="hero-content home-hero-copy home-hero-animate">
            <p className="section-tag home-hero-pill">{activeHero.eyebrow}</p>
            <h4>{activeHero.title}</h4>
            <p>{activeHero.text}</p>
            <div className="hero-actions home-hero-actions">
              <Link to={activeHero.ctaPath} className="btn btn-primary">
                {activeHero.ctaLabel}
              </Link>
              <Link to="/about" className="btn btn-light-outline">
                Learn More
              </Link>
            </div>
            <div className="home-hero-highlights home-hero-highlights--saas" aria-label="Omega highlights">
              {heroHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="home-hero-visual home-hero-animate">
            <div className="home-hero-visual-frame">
              <div
                className="home-hero-visual-track"
                style={{ transform: `translateX(-${activeHeroIndex * 100}%)` }}
              >
                {heroSlides.map((slide) => {
                  const slideImage = resolveHeroSlideImage(slide, imageUrls, homeHeroImage)

                  return (
                    <article key={slide.title} className="home-hero-visual-slide" aria-hidden={slide.title !== activeHero.title}>
                      <div className="home-hero-visual-card home-hero-visual-card--top">
                        <p className="home-hero-visual-kicker">Capability</p>
                        <span>{slide.capability}</span>
                      </div>
                      <div className="home-hero-visual-card home-hero-visual-card--bottom">
                        <strong>{slide.footer}</strong>
                      </div>
                      <img src={slideImage} alt={slide.title} />
                    </article>
                  )
                })}
              </div>
            </div>
            <div className="home-hero-dots" aria-label="Choose hero slide">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={index === activeHeroIndex ? 'is-active' : ''}
                  aria-label={`Show slide ${index + 1}: ${slide.title}`}
                  aria-current={index === activeHeroIndex ? 'true' : 'false'}
                  onClick={() => setActiveHeroIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-stats">
        <div className="site-container home-stats-grid">
          {stats.map((item) => (
            <article key={item.label}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section home-capabilities">
        <div className="site-container">
          <div className="section-heading home-capabilities-head">
            <div className="home-capabilities-title">
              <div className="home-capabilities-kicker" aria-label="Section label">
                <span>[ 003 / CAPABILITIES ]</span>
              </div>
              <h4>
                <span className="home-capabilities-line">A sharper</span>
                <span className="home-capabilities-line">
                  <em>operating model</em> for
                </span>
                <span className="home-capabilities-line">
                  dairy &amp; <span className="home-capabilities-highlight">agriculture</span>
                </span>
                <span className="home-capabilities-line">growth.</span>
              </h4>
            </div>
            <div className="home-capabilities-intro">
              <p>
                Three disciplines, one integrated stack built for traceability, engineered for
                trust, and tuned for the realities of modern supply.
              </p>
              <div className="home-capabilities-meta" aria-label="Capabilities summary">
                <span>Vertical</span>
                <span>Integrated</span>
                <span>Est. 2020</span>
              </div>
            </div>
          </div>
          <div className="home-capabilities-grid">
            {capabilityPillars.map((item, index) => (
              <article
                key={item.label}
                className={`home-capability-card home-capability-card--${item.theme}`}
              >
                <div className="home-capability-card-top">
                  <span className="home-capability-pill">
                    {item.category} <span>0{index + 1}</span>
                  </span>
                  <span className="home-capability-icon" aria-hidden="true" />
                </div>
                <span className="home-capability-ghost">0{index + 1}</span>
                <div className="home-capability-body">
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </div>
                <div className="home-capability-foot">
                  <div className="home-capability-metric">
                    <strong>{item.metric}</strong>
                    <span>{item.metricLabel}</span>
                  </div>
                  <span className="home-capability-link">
                    Explore <i aria-hidden="true">↗</i>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container home-about-clean home-story-shell">
          <div className="home-story-visual">
            <div className="home-story-frame-accent" aria-hidden="true" />
            <img src={homeAboutImage || ''} alt="Farm worker in field" />
            <div className="home-story-stat-card">
              <span className="home-story-stat-pill">ISO-Grade</span>
              <small>Herd Health</small>
              <strong>99.2%</strong>
            </div>
            <div className="home-story-badge">
              <strong>Since 2021</strong>
              <span>Scaling dairy quality with modern systems</span>
            </div>
          </div>
          <div className="home-story-copy">
            <div className="home-story-kicker">
              <span>About Omega</span>
            </div>
            <h4>
              <span className="home-story-title-accent">Operational clarity,</span>
              <br />
              sustainable thinking, and
              <br />
              <em>premium milk production.</em>
            </h4>
            <p className="home-story-lead">
              Omega Dairy was founded to produce milk in Pakistan at standards aligned with
              global benchmarks while building a smarter, more resilient farm ecosystem from
              the ground up.
            </p>
            <div className="home-story-apart">
              <h5>What sets Omega Dairy apart</h5>
            </div>
            <div className="home-story-feature-grid">
              {aboutHighlights.map((item) => (
                <article key={item.text} className="home-story-feature-card">
                  <span className={`home-story-feature-icon home-story-feature-icon--${item.icon}`} aria-hidden="true" />
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="home-story-actions">
              <Link to="/about" className="btn btn-primary">
                Discover Omega
              </Link>
              <div className="home-story-meta" aria-label="Operational focus">
                <span>Pasture</span>
                <span>Process</span>
                <span>Pack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-bg">
        <div className="site-container home-units-shell">
          <div className="section-heading home-units-head">
            <p className="section-tag">Operational Units</p>
            <h4>Three focused units built around production, processing, and livestock care.</h4>
          </div>
          <div className="home-services-grid">
            {services.map((service) => {
              const unitMatch = service.title.match(/^Unit\s+(\d+)$/i)
              const unitPath = unitMatch ? `/unit-${unitMatch[1]}` : null

              return (
                <article
                  key={service.title}
                  className={`home-service-card home-unit-card${unitPath ? ' home-service-card--link' : ''}`}
                  role={unitPath ? 'link' : undefined}
                  tabIndex={unitPath ? 0 : undefined}
                  aria-label={unitPath ? `Open ${service.title} details` : undefined}
                  onClick={
                    unitPath
                      ? () => {
                          navigate(unitPath)
                        }
                      : undefined
                  }
                  onKeyDown={
                    unitPath
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            navigate(unitPath)
                          }
                        }
                      : undefined
                  }
                >
                  <img src={imageUrls[service.imageName] || ''} alt={service.title} />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section alt-bg home-products-section">
        <div className="site-container">
          <div className="section-heading home-products-heading">
            <p className="section-tag">Our Products</p>
            <h3>Fresh from the farm, presented with a cleaner product story.</h3>
          </div>
          <div className="home-products-showcase">
            <article
              className={`home-products-slider-card${productsPaused ? ' is-paused' : ''}`}
              onMouseEnter={() => setProductsPaused(true)}
              onMouseLeave={() => setProductsPaused(false)}
              onFocus={() => setProductsPaused(true)}
              onBlur={() => setProductsPaused(false)}
            >
              <div
                className="home-products-slider-track"
                aria-hidden="true"
                style={{ width: `${productSlides.length * 100}%` }}
              >
                {productSlides.map((product, index) => (
                  <figure
                    key={`${product.title}-${index}`}
                    className="home-products-slide"
                    style={{ width: `${100 / productSlides.length}%` }}
                  >
                    <img
                      src={imageUrls[product.imageName] || imageUrls[product.fallbackImageName] || ''}
                      alt={product.title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </figure>
                ))}
              </div>
            </article>

            <article className="home-products-info-card">
              <p className="home-products-info-kicker">{products[activeProductIndex].title}</p>
              <p className="home-products-info-copy">{products[activeProductIndex].text}</p>
              <ul className="home-products-info-list">
                {products.map((product, index) => (
                  <li key={product.title} className={index === activeProductIndex ? 'active' : ''}>
                    <button type="button" onClick={() => setActiveProductIndex(index)}>
                      {product.title}
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container home-testimonials-shell">
          <div className="section-heading home-testimonials-head">
            <p className="section-tag">Testimonials</p>
            <h2>What partners value in Omega.</h2>
          </div>
          <div className="home-testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="home-testimonial-card">
                <span className="home-testimonial-mark" aria-hidden="true">
                  ✦
                </span>
                <p>"{item.quote}"</p>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt-bg">
        <div className="site-container home-blog-shell">
          <div className="section-heading home-blog-head">
            <p className="section-tag">Latest Blog</p>
            <h2>Insights shaped by operations, quality, and supply thinking.</h2>
          </div>
          <div className="home-blog-grid">
            {posts.map((post, index) => (
              <article key={post.title} className="home-blog-card">
                <span
                  className={`home-blog-icon home-blog-icon--${index % 3}`}
                  aria-hidden="true"
                />
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <Link to="/blog">Read More →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section members-showcase">
        <div className="site-container">
          <div className="section-heading">
            <p className="members-kicker">Our Members</p>
          </div>

          <div className="members-grid" aria-label="Our Members">
            {displayedMembers.map((member) => (
              <div key={member.id || member.name} className="member-cell">
                {member.href ? (
                  <a
                    className="member-link"
                    href={member.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${member.name} website`}
                    title={`Visit ${member.name}`}
                  >
                    <img src={resolveMemberLogoSrc(member, imageUrls)} alt={member.name} loading="lazy" />
                  </a>
                ) : (
                  <img src={resolveMemberLogoSrc(member, imageUrls)} alt={member.name} loading="lazy" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container home-subscribe">
          <div>
            <p className="section-tag">Subscribe</p>
            <h2>Get farm updates and fresh product news.</h2>
            <p>Join our newsletter to receive seasonal offers, new arrivals, and practical farming insights.</p>
          </div>
          <form className="subscribe-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="subscribe-email" className="sr-only">
              Email Address
            </label>
            <input id="subscribe-email" type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-accent">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
