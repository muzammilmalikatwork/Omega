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
    role: 'Livestock Care',
    imageName: 'team2.jpeg',
  },
  {
    name: 'Vincent Cooper',
    role: 'Feed Programs',
    imageName: 'team3.jpeg',
  },
  {
    name: 'Ayesha Khan',
    role: 'Veterinary Support',
    imageName: 'team1.jpeg',
  },
  {
    name: 'Usman Tariq',
    role: 'Shelter Maintenance',
    imageName: 'team2.jpeg',
  },
]

const unitGalleryImages = [
  {
    imageName: 'cow.jpg',
    alt: 'Cattle',
  },
  {
    imageName: 'about.jpg',
    alt: 'Cow closeup',
  },
  {
    imageName: 'services.jpg',
    alt: 'Feeding livestock',
  },
  {
    imageName: 'co.jpg',
    alt: 'Healthy feed',
  },
  {
    imageName: 'about1.jpeg',
    alt: 'Farm shelter',
  },
  {
    imageName: 'c.jpg',
    alt: 'Animal care',
  },
  {
    imageName: 'cow.jpg',
    alt: 'Nutrition and health',
  },
  {
    imageName: 'services.jpg',
    alt: 'Herd management',
  },
]

export default function Unit3() {
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
          <h1>Unit 3</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Unit 3</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container unit-intro">
          <div className="unit-intro-text">
            <p className="section-tag">Farm Introduction</p>
            <h2>Healthy herds through routine care.</h2>
            <p>
              Unit 3 handles feed planning, shelter upkeep, and regular veterinary checks to keep livestock healthy and
              productive.
            </p>
            <ul className="unit-intro-list">
              <li>Balanced nutrition & feed schedules</li>
              <li>Clean shelter & comfort checks</li>
              <li>Routine vet visits & monitoring</li>
            </ul>
          </div>
          <div className="unit-intro-media">
            <img src={unitIntroImage || undefined} alt="Omega livestock unit" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="section-heading center">
            <p className="section-tag">Gallery</p>
            <h2>Unit 3 Photos</h2>
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

