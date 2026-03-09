const teamMembers = [
  {
    name: 'Ali Raza',
    role: 'Farm Operations Head',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Maham Khan',
    role: 'Dairy Quality Manager',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Usman Tariq',
    role: 'Livestock Specialist',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Team() {
  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <p className="section-tag">Our Team</p>
          <h1>Meet the Omega Experts</h1>
          <p>Experienced professionals managing cultivation, dairy production, and quality control.</p>
        </div>
      </section>

      <section className="section">
        <div className="site-container cards-3 team-grid">
          {teamMembers.map((member) => (
            <article key={member.name} className="team-card">
              <img src={member.image} alt={member.name} />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
