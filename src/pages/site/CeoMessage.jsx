import { Link } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'




const steps = [
  {
    title: 'Planning And Forecasting',
    text: 'We map seasonal demand, production goals, and operational timelines before execution.',
  },
  {
    title: 'Quality-Centered Operations',
    text: 'Every stage includes checks for hygiene, freshness, and process consistency.',
  },
  {
    title: 'Reliable Delivery',
    text: 'Structured logistics ensure timely dispatch and stable supply for recurring clients.',
  },
]

const brands = ['AgriCorp', 'Farmline', 'GreenMart', 'DairyHub', 'HarvestCo', 'FreshNest']

export default function CeoMessage() {
  const images = useDatabaseImages()
  const aboutImageUrl = images['about.jpg']
  const aboutHeroImageUrl = images['about1.jpeg']
  const stepsImageUrl = images['services.jpg']

  return (
    <div className="about-template">
      <section
        className="services-breadcrumb about-breadcrumb"
        style={{ backgroundImage: aboutHeroImageUrl ? `url(${aboutHeroImageUrl})` : undefined }}
      >
        <div className="site-container services-breadcrumb-inner">
          <h1>CEO Message</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>CEO Message</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container about-template-intro">
          <div>
            <p className="section-tag">CEO Message</p>
        
            <p>
              Driven by our vision of “Aghaz-e-Pakistan”, Omega Dairy is committed to expanding production capacity and aims to achieve 300,000 litres of milk per day, 
              contributing to the growth and modernization of Pakistan’s dairy industry.
            </p>
            <p>
              At Omega Dairy, we are building the future of dairy farming through advanced technology, automation, and a strong commitment to food safety and quality. 
              Our operations are designed around modern dairy management systems, industrial-scale efficiency, 
              and sustainable farming practices.
            </p>
          </div>
          <div className="about-template-image-wrap">
            <img src={aboutImageUrl || ''} alt="About Omega" />
            <button type="button" className="about-play-badge" aria-label="Play intro video">
              â–¶
            </button>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="site-container about-template-steps">
          <img src={stepsImageUrl || ''} alt="How we work" />
          <div>
            <p className="section-tag">Our Steps</p>
            <h2>How We Work On Quality</h2>
            <div className="about-step-list">
              {steps.map((step) => (
                <article key={step.title} className="about-step-item">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
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

