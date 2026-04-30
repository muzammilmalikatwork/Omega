import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const teamMembers = [
  {
    name: 'Howard Holmes',
    role: 'CEO & Founder',
    imageName: 'team1.jpeg',
    objectPosition: '50% 40%',
  },
  {
    name: 'Ella Thompson',
    role: 'Dcfarm Team',
    imageName: 'team2.jpeg',
    objectPosition: '60% 35%',
  },
  {
    name: 'Vincent Cooper',
    role: 'Dcfarm Team',
    imageName: 'team3.jpeg',
    objectPosition: '35% 35%',
  },
]

const socialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8h2V5h-2c-2.8 0-4 1.7-4 4v2H8v3h2v5h3v-5h2.4l.6-3H13V9c0-.7.3-1 1-1Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm10.05 1.35a1.05 1.05 0 1 1 0 2.1a1.05 1.05 0 0 1 0-2.1ZM12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8Zm0 1.8a2.2 2.2 0 1 0 0 4.4a2.2 2.2 0 0 0 0-4.4Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 7.1c.8-.1 1.5-.5 2.1-1c-.3.9-.8 1.6-1.5 2.1v.5c0 5.4-4.1 11.7-11.7 11.7c-2.3 0-4.4-.7-6.2-1.8h.9c1.9 0 3.6-.6 5-1.8c-1.7 0-3.2-1.2-3.7-2.8h.7c.3 0 .7 0 1-.1c-1.8-.4-3.2-2-3.2-4v-.1c.5.3 1.1.5 1.8.5A4.1 4.1 0 0 1 2.7 7c0-.8.2-1.5.6-2.2A11.7 11.7 0 0 0 11.8 9A4.1 4.1 0 0 1 18.9 7.1Z" />
    </svg>
  ),
}

const socialLinks = {
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
}

const teamLogos = [
  { label: 'Chicken Farm', imageName: 'b-logo1.png' },
  { label: 'Milk Farm', imageName: 'b-logo2.png' },
  { label: 'Family Farm', imageName: 'b-logo3.png' },
  { label: 'Farm Meat', imageName: 'b-logo4.png' },
  { label: 'Goose Farm', imageName: 'b-logo5.png' },
]

export default function Team() {
  const [teamLogoIndex, setTeamLogoIndex] = useState(0)
  const images = useDatabaseImages()

  const visibleTeamLogos = useMemo(
    () => Array.from({ length: 4 }, (_, offset) => teamLogos[(teamLogoIndex + offset) % teamLogos.length]),
    [teamLogoIndex]
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTeamLogoIndex((currentIndex) => (currentIndex + 1) % teamLogos.length)
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <>
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: images['team.webp'] ? `url(${images['team.webp']})` : undefined }}
      >
        <div className="site-container services-breadcrumb-inner">
          <h1>Our Team</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Our Team</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container cards-3 team-showcase-grid">
          {teamMembers.map((member) => (
            <article key={member.name} className="team-showcase-card">
              <img
                src={images[member.imageName] || ''}
                alt={member.name}
                loading="lazy"
                style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
              />
              <div className="team-showcase-body">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="team-showcase-socials">
                  {Object.entries(socialIcons).map(([key, icon]) => (
                    <a
                      key={key}
                      href={socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} ${key}`}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery-brand-strip team-brand-strip">
        <div className="site-container team-brand-row">
          {visibleTeamLogos.map((item, index) => (
            <article key={`${item.label}-${index}`} className="gallery-brand-mark team-brand-mark">
              <img src={images[item.imageName] || ''} alt={item.label} />
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

