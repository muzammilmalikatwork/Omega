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
    role: 'Dairy Processing',
    imageName: 'team2.jpeg',
  },
  {
    name: 'Vincent Cooper',
    role: 'Hygiene & QA',
    imageName: 'team3.jpeg',
  },
  {
    name: 'Ayesha Khan',
    role: 'Cold Chain',
    imageName: 'team1.jpeg',
  },
  {
    name: 'Usman Tariq',
    role: 'Packaging',
    imageName: 'team2.jpeg',
  },
]

const unitGalleryImages = [
  {
    imageName: 'about.jpg',
    alt: 'Milk and dairy',
  },
  {
    imageName: 'services.jpg',
    alt: 'Dairy equipment',
  },
  {
    imageName: 'cow.jpg',
    alt: 'Fresh milk',
  },
  {
    imageName: 'about1.jpeg',
    alt: 'Milk bottles',
  },
  {
    imageName: 'co.jpg',
    alt: 'Dairy processing',
  },
  {
    imageName: 'c.jpg',
    alt: 'Quality checks',
  },
  {
    imageName: 'about.jpg',
    alt: 'Hygiene standards',
  },
  {
    imageName: 'services.jpg',
    alt: 'Cold chain storage',
  },
]

export default function Unit2() {
  const images = useDatabaseImages()
  const unitHeroImage = images['services.jpg']
  const unitIntroImage = images['about.jpg']

  return (
    <div className="unit-template">
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: unitHeroImage ? `url(${unitHeroImage})` : undefined }}
      >
        <div className="site-container services-breadcrumb-inner">
          <h1>Unit 2</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Unit 2</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container unit-intro">
          <div className="unit-intro-text">
            <p className="section-tag">Farm Introduction</p>
            <h2>Fresh dairy processed with strict hygiene.</h2>
            <p>
              Unit 2 manages milk collection, processing, and packaging with hygiene-first controls to keep products
              fresh, safe, and consistent.
            </p>
            <ul className="unit-intro-list">
              <li>Clean processing & quality checks</li>
              <li>Temperature-controlled handling</li>
              <li>Safe packaging for delivery</li>
            </ul>
          </div>
          <div className="unit-intro-media">
            <img src={unitIntroImage || ''} alt="Omega dairy processing unit" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Gallery</p>
            <h2>Unit 2 Photos</h2>
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
