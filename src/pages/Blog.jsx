const posts = [
  {
    title: '5 Ways Smart Irrigation Saves Water',
    text: 'Practical methods Omega uses to improve crop yield while conserving water resources.',
  },
  {
    title: 'How Omega Maintains Dairy Hygiene',
    text: 'A closer look at our processing standards that protect freshness and quality.',
  },
  {
    title: 'Crop Rotation for Better Soil',
    text: 'Why planned crop cycles are essential for long-term farm productivity.',
  },
]

export default function Blog() {
  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <p className="section-tag">Latest Blog</p>
          <h1>Farm News & Insights</h1>
          <p>Updates and practical agriculture knowledge from the Omega team.</p>
        </div>
      </section>

      <section className="section">
        <div className="site-container cards-3 blog-cards">
          {posts.map((post) => (
            <article key={post.title} className="feature-card">
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <button className="text-link" type="button">
                Read More
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
