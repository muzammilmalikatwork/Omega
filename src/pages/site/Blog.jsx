import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const categories = [
  { name: 'Branding', count: 4 },
  { name: 'Design', count: 2 },
  { name: 'Organic', count: 3 },
  { name: 'Dairy', count: 2 },
]

const tags = ['Agri', 'Dairy', 'Irrigation', 'Branding', 'Organic', 'Delivery']

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const images = useDatabaseImages()
  const blogHeroImageUrl = images['about1.jpeg']

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/posts')
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || 'Unable to fetch posts.')
        }
        setPosts(result.posts)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredPosts = posts.filter((post) => {
    if (!normalizedQuery) return true
    return [post.title, post.excerpt].some((value) => String(value || '').toLowerCase().includes(normalizedQuery))
  })

  return (
    <>
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: blogHeroImageUrl ? `url(${blogHeroImageUrl})` : undefined }}
      >
        <div className="site-container services-breadcrumb-inner">
          <h1>Blog</h1>
        </div>
      </section>

      <section className="section">
        <div className="site-container blog-layout">
          <div className="blog-feed" aria-label="Blog posts">
            {loading && <p>Loading posts...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && posts.length === 0 && <p>No posts found yet.</p>}
            {!loading && !error && posts.length > 0 && filteredPosts.length === 0 && (
              <p>No posts match your search.</p>
            )}
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-entry">
                {post.image_url && <img src={post.image_url} alt={post.title} loading="lazy" />}

                <div className="blog-entry-body">
                  <div className="blog-entry-meta" aria-label="Post details">
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>

                  <h2 className="blog-entry-title">{post.title}</h2>
                  <p className="blog-entry-excerpt">{post.excerpt}</p>

                  <Link className="blog-readmore" to={`/blog/${post.id}`}>
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="blog-sidebar" aria-label="Blog sidebar">
            <div className="blog-widget">
              <h3>Search</h3>
              <form className="blog-search" onSubmit={(event) => event.preventDefault()}>
                <input
                  type="search"
                  placeholder="Search..."
                  aria-label="Search posts"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit" aria-label="Search posts">
                  Search
                </button>
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
                  <li key={post.id}>
                    <Link className="blog-recent-link" to={`/blog/${post.id}`}>
                      <span className="blog-recent-title">{post.title}</span>
                      <span className="blog-recent-date">
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    </Link>
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
