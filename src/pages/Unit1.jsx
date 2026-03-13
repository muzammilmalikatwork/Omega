import { Link } from 'react-router-dom'
import unitHeroImage from '../../image/services.jpg'
import unitIntroImage from '../../image/about1.jpeg'

const unitTeamMembers = [
  {
    name: 'Howard Holmes',
    role: 'CEO & Founder',
    image:
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ella Thompson',
    role: 'Farm Operations',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vincent Cooper',
    role: 'Irrigation Lead',
    image:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ayesha Khan',
    role: 'Quality Assurance',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Usman Tariq',
    role: 'Field Supervisor',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
]

const unitGalleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    alt: 'Farm fields',
  },
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Green crops',
  },
  {
    src: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Harvest in field',
  },
  {
    src: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fresh vegetables',
  },
  {
    src: 'https://images.unsplash.com/photo-1528804431125-842e3f473e58?auto=format&fit=crop&w=1200&q=80',
    alt: 'Irrigation water',
  },
  {
    src: 'https://images.unsplash.com/photo-1465408953385-7c4627c29435?auto=format&fit=crop&w=1200&q=80',
    alt: 'Farm landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1466048791285-7e6f0abf23c9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Planting rows',
  },
  {
    src: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Farmer working',
  },
]

export default function Unit1() {
  return (
    <div className="unit-template">
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${unitHeroImage})` }}>
        <div className="site-container services-breadcrumb-inner">
          <h1>Unit 1</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Unit 1</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container unit-intro">
          <div className="unit-intro-text">
            <p className="section-tag">Farm Introduction</p>
            <h2>Season-based farming, planned the smart way.</h2>
            <p>
              Unit 1 focuses on seasonal crop planning, controlled irrigation, and soil-first cultivation to keep output
              consistent across the year.
            </p>
            <ul className="unit-intro-list">
              <li>Season planning & crop rotation</li>
              <li>Drip + controlled irrigation schedules</li>
              <li>Field monitoring for healthier yields</li>
            </ul>
          </div>
          <div className="unit-intro-media">
            <img src={unitIntroImage} alt="Omega farm unit 1 fields" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Gallery</p>
            <h2>Unit 1 Photos</h2>
          </div>
          <div className="unit-gallery-grid">
            {unitGalleryImages.map((item) => (
              <figure key={item.src} className="unit-gallery-card">
                <img src={item.src} alt={item.alt} loading="lazy" />
                <figcaption>{item.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt-bg">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Team</p>
            <h2>Team Members</h2>
          </div>
          <div className="unit-members-grid">
            {unitTeamMembers.map((member) => (
              <article key={member.name} className="unit-member-card">
                <img src={member.image} alt={member.name} loading="lazy" />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
