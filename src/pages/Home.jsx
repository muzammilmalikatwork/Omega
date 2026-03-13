import { Link, useNavigate } from 'react-router-dom'
import unit1CardImage from '../../image/c.jpg'
import unit2CardImage from '../../image/co.jpg'
import unit3CardImage from '../../image/cow.jpg'
import memberLogo1 from '../../image/unilever.png'
import memberLogo2 from '../../image/haleeb.jpeg'
import memberLogo3 from '../../image/pakola.png'
import memberLogo4 from '../../image/nestle.png'
import memberLogo5 from '../../image/dalda.png'
import memberLogo6 from '../../image/gourment.png'
import memberLogo7 from '../../image/adams.jpeg'
import memberLogo8 from '../../image/fauji.png'
import memberLogo9 from '../../image/dairyland.jpeg'
import memberLogo10 from '../../image/fries.png'
import memberLogo11 from '../../image/tetra.jpeg'
import memberLogo12 from '../../image/shak.png'

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
    image: unit1CardImage,
  },
  {
    title: 'Unit 2',
    text: 'Fresh milk, butter, and yogurt processed with strict hygiene standards.',
    image: unit2CardImage,
  },
  {
    title: 'Unit 3',
    text: 'Healthy feed programs, shelter maintenance, and regular veterinary checks.',
    image: unit3CardImage,
  },
  
]

const members = [
  { name: 'Unilever', image: memberLogo1, href: 'https://www.unilever.pk/' },
  { name: 'Haleeb', image: memberLogo2, href: 'https://haleebfoods.com/' },
  { name: 'Pakola', image: memberLogo3, href: 'https://pakola.com.pk/' },
  { name: 'Nestle', image: memberLogo4, href: 'https://www.nestle.pk/' },
  { name: 'Dalda', image: memberLogo5, href: 'https://www.daldafoods.com/' },
  { name: 'Gourmet Foods', image: memberLogo6, href: 'https://gourmetfoods.pk/' },
  { name: "Adam's", image: memberLogo7, href: 'https://www.adams.pk/' },
  { name: 'Fauji Foods', image: memberLogo8, href: 'https://www.faujifoods.com/' },
  { name: 'Dairyland', image: memberLogo9, href: 'https://www.dairylandltd.com/' },
  { name: 'FrieslandCampina', image: memberLogo10, href: 'https://www.frieslandcampina.com/pk/' },
  { name: 'Tetra Pak', image: memberLogo11, href: 'https://www.tetrapak.com/en-pk' },
  { name: 'Shakarganj', image: memberLogo12, href: 'https://shakarganjfood.com/' },
]

const products = [
  {
    title: 'Fresh Milk',
    text: 'Daily collection with cold-chain quality checks.',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Organic Vegetables',
    text: 'Farm-fresh vegetables harvested and packed daily.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Natural Butter',
    text: 'Pure dairy butter made from quality cream.',
    image:
      'https://images.unsplash.com/photo-1589985270958-bcb439f8f1fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Healthy Feed',
    text: 'Balanced nutrition for stronger livestock growth.',
    image:
    'https://images.unsplash.com/photo-1589985270958-bcb439f8f1fa?auto=format&fit=crop&w=1200&q=80',
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

  return (
    <div className="home-clean">
      <section className="home-hero">
        <div className="site-container home-hero-grid">
          <div>
            <p className="section-tag">Welcome To Omega Farm</p>
            <h1>Agriculture And Dairy Farm For Better Future</h1>
            <p>
              We combine modern farming systems with traditional care to deliver clean dairy and fresh produce.
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
            src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1400&q=80"
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
            src="https://images.unsplash.com/photo-1500930287596-c1e886d11b9d?auto=format&fit=crop&w=1400&q=80"
            alt="Farm worker in field"
          />
          <div>
            <p className="section-tag">About Omega</p>
            <h2>Trusted Partner For Farming And Dairy Solutions</h2>
            <p>
              Omega Farm follows soil-first cultivation, healthy livestock care, and quality-controlled processing to
              deliver food you can trust.
            </p>
            <ul>
              <li>Organic-first field methods</li>
              <li>Certified dairy handling process</li>
              <li>Reliable direct supply chain</li>
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
                  <img src={service.image} alt={service.title} />
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
                <img src={product.image} alt={product.title} />
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

      <section className="section">
        <div className="site-container">
          <div className="section-heading center">
            <p className="members-kicker">OUR MEMBERS</p>
          </div>

          <div className="members-grid" aria-label="Our Members">
            {members.map((member) => (
              <div key={member.name} className="member-cell">
                {member.href ? (
                  <a
                    className="member-link"
                    href={member.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${member.name} website`}
                    title={`Visit ${member.name}`}
                  >
                    <img src={member.image} alt={member.name} loading="lazy" />
                  </a>
                ) : (
                  <img src={member.image} alt={member.name} loading="lazy" />
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
