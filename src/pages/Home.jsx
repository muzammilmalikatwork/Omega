import { Link } from 'react-router-dom'

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '8K+', label: 'Acres Cultivated' },
  { value: '12K+', label: 'Happy Customers' },
  { value: '150+', label: 'Expert Farmers' },
]

const services = [
  {
    title: 'Crop Cultivation',
    text: 'Season-based farming with smart planning and controlled irrigation.',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Dairy Production',
    text: 'Fresh milk, butter, and yogurt processed with strict hygiene standards.',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Livestock Care',
    text: 'Healthy feed programs, shelter maintenance, and regular veterinary checks.',
    image:
      'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Form Units',
    text: 'There will be three units. Unit 1 , unit 2 , unit 3.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
  },
]

const process = [
  { step: '01', title: 'Land Preparation', text: 'Soil analysis and seasonal readiness planning.' },
  { step: '02', title: 'Seed & Feed Setup', text: 'High-quality seed selection and nutrition setup.' },
  { step: '03', title: 'Growth Monitoring', text: 'Continuous crop and animal health monitoring.' },
  { step: '04', title: 'Harvest & Supply', text: 'Safe harvesting and fast farm-to-customer delivery.' },
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
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
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
            <p className="section-tag">Our Services</p>
            <h2>Professional Farming Services</h2>
          </div>
          <div className="home-services-grid">
            {services.map((service) => (
              <article key={service.title} className="home-service-card">
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
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Work Process</p>
            <h2>Simple Steps We Follow</h2>
          </div>
          <div className="home-process-grid">
            {process.map((item) => (
              <article key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
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
