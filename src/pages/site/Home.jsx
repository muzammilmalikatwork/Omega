import { useEffect, useState } from 'react'
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

const products = [
  {
    title: 'Fresh Milk',
    text: 'Daily collection with cold-chain quality checks.',
    imageName: 'about.jpg',
  },
  {
    title: 'Organic Vegetables',
    text: 'Farm-fresh vegetables harvested and packed daily.',
    imageName: 'co.jpg',
  },
  {
    title: 'Natural Butter',
    text: 'Pure dairy butter made from quality cream.',
    imageName: 'services.jpg',
  },
  {
    title: 'Healthy Feed',
    text: 'Balanced nutrition for stronger livestock growth.',
    imageName: 'cow.jpg',
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

export default function Home() {
  const navigate = useNavigate()
  const imageUrls = useDatabaseImages()
  const homeHeroImage = imageUrls['about1.jpeg']
  const homeAboutImage = imageUrls['about.jpg']
  const [dbMembers, setDbMembers] = useState([])

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

  const displayedMembers = dbMembers.length > 0 ? dbMembers : members

  return (
    <div className="home-clean">
      <section className="home-hero">
        <div className="site-container home-hero-grid">
          <div>
            <p className="section-tag">Welcome To Omega Farm</p>
            <h1>Omega Dairy – Redefining Dairy Excellence in Pakistan</h1>
            <p>
              Established in 2021, Omega Dairy was founded with a clear vision: to produce milk in Pakistan at standards that meet and exceed global benchmarks.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary">
                Our Services
              </Link>
              <Link to="/about" className="btn btn-light-outline">
                Learn More
              </Link>
            </div>
          </div>
          <img
            src={homeHeroImage || ''}
            alt="Green farm landscape"
          />
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

      <section className="section">
        <div className="site-container home-about-clean">
          <img
            src={homeAboutImage || ''}
            alt="Farm worker in field"
          />
          <div>
            <h1>About Omega</h1>
          
            <h4>
              What sets Omega Dairy apart is our dedication to innovation and sustainability, including:</h4>
            <ul>
              <li>Advanced ventilation systems for animal comfort.</li>
              <li>Genomic testing for superior heifer selection.</li>
              <li>Feed testing through internationally recognized nutrition laboratories</li>
              <li>Manure fiber separation technology.</li>
              <li>Water and sand recycling systems for environmental sustainability.</li>
              <li>We proudly supply premium-quality milk to leading dairy processors, including Nestlé, Milac, and Haleeb Foods.</li>
            </ul>
            <Link to="/about" className="btn btn-primary">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt-bg">
        <div className="site-container">
          <div className="section-heading center">
            <h2 className="section-tag">Our Farms</h2>
          </div>
          <div className="home-services-grid">
            {services.map((service) => {
              const unitMatch = service.title.match(/^Unit\s+(\d+)$/i)
              const unitPath = unitMatch ? `/unit-${unitMatch[1]}` : null

              return (
                <article
                  key={service.title}
                  className={`home-service-card${unitPath ? ' home-service-card--link' : ''}`}
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

      <section className="section alt-bg">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Our Products</p>
            <h2>Fresh From Farm</h2>
          </div>
          <div className="home-products-grid">
            {products.map((product) => (
              <article key={product.title} className="home-product-card">
                <img src={imageUrls[product.imageName] || ''} alt={product.title} />
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Testimonials</p>
            <h2>What Clients Say</h2>
          </div>
          <div className="home-testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name}>
                <p>"{item.quote}"</p>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt-bg">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Latest Blog</p>
            <h2>News & Insights</h2>
          </div>
          <div className="home-blog-grid">
            {posts.map((post) => (
              <article key={post.title}>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <Link to="/blog">Read More</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section members-showcase">
        <div className="site-container">
          <div className="section-heading center">
            <p className="members-kicker">OUR MEMBERS</p>
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
            <h2>Get Farm Updates and Fresh Product News</h2>
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

      <section className="section cta-band">
        <div className="site-container cta-inner">
          <div>
            <p className="section-tag">Need Quality Supply?</p>
            <h2>Work with Omega for consistent farm and dairy products.</h2>
          </div>
          <Link to="/contact" className="btn btn-accent">
            Contact Now
          </Link>
        </div>
      </section>
    </div>
  )
}

