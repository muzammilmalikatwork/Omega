import { Link } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const unitTeamMembers = [
  {
    name: 'Howard Holmes',
    role: 'CEO & Founder',
    imageName: 'team1.jpeg',
  },
  {
    name: 'Ella Thompson',
    role: 'Farm Operations',
    imageName: 'team2.jpeg',
  },
  {
    name: 'Vincent Cooper',
    role: 'Irrigation Lead',
    imageName: 'team3.jpeg',
  },
  {
    name: 'Ayesha Khan',
    role: 'Quality Assurance',
    imageName: 'team1.jpeg',
  },
  {
    name: 'Usman Tariq',
    role: 'Field Supervisor',
    imageName: 'team2.jpeg',
  },
]

const unitGalleryImages = [
  {
    imageName: 'c.jpg',
    alt: 'Farm fields',
  },
  {
    imageName: 'co.jpg',
    alt: 'Green crops',
  },
  {
    imageName: 'cow.jpg',
    alt: 'Harvest in field',
  },
  {
    imageName: 'about1.jpeg',
    alt: 'Fresh vegetables',
  },
  {
    imageName: 'services.jpg',
    alt: 'Irrigation water',
  },
  {
    imageName: 'about.jpg',
    alt: 'Farm landscape',
  },
  {
    imageName: 'c.jpg',
    alt: 'Planting rows',
  },
  {
    imageName: 'co.jpg',
    alt: 'Farmer working',
  },
]

export default function Unit1() {
  const images = useDatabaseImages()
  const unitHeroImage = images['services.jpg']
  const unitIntroImage = images['about1.jpeg']

  return (
    <div className="unit-template">
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: unitHeroImage ? `url(${unitHeroImage})` : undefined }}
      >
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
            <img src={unitIntroImage || ''} alt="Omega farm unit 1 fields" loading="lazy" />
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
              <figure key={`${item.imageName}-${item.alt}`} className="unit-gallery-card">
                <img src={images[item.imageName] || ''} alt={item.alt} loading="lazy" />
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
                <img src={images[member.imageName] || ''} alt={member.name} loading="lazy" />
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
