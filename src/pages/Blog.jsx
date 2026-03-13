import { Link } from 'react-router-dom'
import blogHeroImage from '../../image/about1.jpeg'

const posts = [
  {
    title: '5 Ways Smart Irrigation Saves Water',
    excerpt: 'Practical methods Omega uses to improve crop yield while conserving water resources.',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80',
    date: '24 March 2026',
    views: 100,
    comments: 33,
  },
  {
    title: 'How Omega Maintains Dairy Hygiene',
    excerpt: 'A closer look at our processing standards that protect freshness and quality.',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1600&q=80',
    date: '18 March 2026',
    views: 86,
    comments: 25,
  },
  {
    title: 'Crop Rotation for Better Soil',
    excerpt: 'Why planned crop cycles are essential for long-term farm productivity.',
    image:
      'https://images.unsplash.com/photo-1500930287596-c1e886d11b9d?auto=format&fit=crop&w=1600&q=80',
    date: '12 March 2026',
    views: 64,
    comments: 19,
  },
]

const categories = [
  { name: 'Branding', count: 4 },
  { name: 'Design', count: 2 },
  { name: 'Organic', count: 3 },
  { name: 'Dairy', count: 2 },
]

const tags = ['Agri', 'Dairy', 'Irrigation', 'Branding', 'Organic', 'Delivery']

export default function Blog() {
  return (
    <>
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${blogHeroImage})` }}>
        <div className="site-container services-breadcrumb-inner">
          <h1>Blog</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Blog</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container blog-layout">
          <div className="blog-feed" aria-label="Blog posts">
            {posts.map((post) => (
              <article key={post.title} className="blog-entry">
                <img src={post.image} alt={post.title} loading="lazy" />

                <div className="blog-entry-body">
                  <div className="blog-entry-meta" aria-label="Post details">
                    <span>{post.views} Views</span>
                    <span>{post.comments} Comments</span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="blog-entry-title">{post.title}</h2>
                  <p className="blog-entry-excerpt">{post.excerpt}</p>

                  <button className="blog-readmore" type="button">
                    Read More
                  </button>
                </div>
              </article>
            ))}

          </div>

          <aside className="blog-sidebar" aria-label="Blog sidebar">
            <div className="blog-widget">
              <h3>Search</h3>
              <form className="blog-search" onSubmit={(event) => event.preventDefault()}>
                <input type="search" placeholder="Search..." aria-label="Search posts" />
                <button type="submit">Search</button>
              </form>
            </div>

            <div className="blog-widget">
              <h3>Categories</h3>
              <ul className="blog-categories">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <span>{cat.name}</span>
                    <span>({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="blog-widget">
              <h3>Recent Posts</h3>
              <ul className="blog-recent">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.title}>
                    <span className="blog-recent-title">{post.title}</span>
                    <span className="blog-recent-date">{post.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="blog-widget">
              <h3>Tag</h3>
              <div className="blog-tags">
                {tags.map((tag) => (
                  <button key={tag} type="button" className="blog-tag">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
