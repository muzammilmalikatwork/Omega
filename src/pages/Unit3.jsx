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
    role: 'Livestock Care',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vincent Cooper',
    role: 'Feed Programs',
    image:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ayesha Khan',
    role: 'Veterinary Support',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Usman Tariq',
    role: 'Shelter Maintenance',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
]

const unitGalleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cattle',
  },
  {
    src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cow closeup',
  },
  {
    src: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Feeding livestock',
  },
  {
    src: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Healthy feed',
  },
  {
    src: 'https://images.unsplash.com/photo-1465408953385-7c4627c29435?auto=format&fit=crop&w=1200&q=80',
    alt: 'Farm shelter',
  },
  {
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Animal care',
  },
  {
    src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    alt: 'Nutrition and health',
  },
  {
    src: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Herd management',
  },
]

export default function Unit3() {
  return (
    <div className="unit-template">
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${unitHeroImage})` }}>
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
            <img src={unitIntroImage} alt="Omega livestock unit" loading="lazy" />
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
