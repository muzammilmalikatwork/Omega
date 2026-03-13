import { Link } from 'react-router-dom'
import unitHeroImage from '../../image/services.jpg'
import unitIntroImage from '../../image/about.jpg'

const unitTeamMembers = [
  {
    name: 'Howard Holmes',
    role: 'CEO & Founder',
    image:
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ella Thompson',
    role: 'Dairy Processing',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vincent Cooper',
    role: 'Hygiene & QA',
    image:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ayesha Khan',
    role: 'Cold Chain',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Usman Tariq',
    role: 'Packaging',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
]

const unitGalleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80',
    alt: 'Milk and dairy',
  },
  {
    src: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dairy equipment',
  },
  {
    src: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Fresh milk',
  },
  {
    src: 'https://images.unsplash.com/photo-1621939514649-280e2aa36a42?auto=format&fit=crop&w=1200&q=80',
    alt: 'Milk bottles',
  },
  {
    src: 'https://images.unsplash.com/photo-1585238342028-4a52d2a7c98b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dairy processing',
  },
  {
    src: 'https://images.unsplash.com/photo-1606813909955-28179f4c2a04?auto=format&fit=crop&w=1200&q=80',
    alt: 'Quality checks',
  },
  {
    src: 'https://images.unsplash.com/photo-1580913428706-c311e67898b8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hygiene standards',
  },
  {
    src: 'https://images.unsplash.com/photo-1615485737651-58016f9d0d1f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cold chain storage',
  },
]

export default function Unit2() {
  return (
    <div className="unit-template">
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${unitHeroImage})` }}>
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
            <img src={unitIntroImage} alt="Omega dairy processing unit" loading="lazy" />
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
