import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

export default function BlogPost() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const images = useDatabaseImages()
  const blogHeroImageUrl = images['about1.jpeg']

  useEffect(() => {
    let cancelled = false

    async function loadPost() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`/api/posts/${postId}`)
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || 'Unable to fetch post.')
        }

        if (cancelled) return
        setPost(result.post)
        setRecentPosts(result.recentPosts || [])
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setPost(null)
          setRecentPosts([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPost()
    return () => {
      cancelled = true
    }
  }, [postId])

  return (
    <>
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: blogHeroImageUrl ? `url(${blogHeroImageUrl})` : undefined }}
      >
        <div className="site-container services-breadcrumb-inner">
          <h1>Blog Details</h1>
        </div>
      </section>

      <section className="section">
        <div className="site-container blog-layout">
          <div className="blog-feed" aria-label="Blog post details">
            {loading && <p>Loading post...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && post && (
              <article className="blog-entry blog-post-detail">
                {post.image_url && <img src={post.image_url} alt={post.title} loading="lazy" />}

                <div className="blog-entry-body">
                  <div className="blog-entry-meta" aria-label="Post details">
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>

                  <h2 className="blog-entry-title">{post.title}</h2>
                  <div className="blog-post-copy">
                    <p>{post.excerpt}</p>
                    <p>
                      Omega shares practical updates, product notes, and operational insight here so visitors can
                      understand what is changing across our farm and dairy work.
                    </p>
                    <p>
                      For supply details, recurring orders, or partnership discussions, our team can walk you through
                      the next steps directly.
                    </p>
                  </div>

                  <Link className="blog-backlink" to="/blog">
                    Back to Blog
                  </Link>
                </div>
              </article>
            )}
          </div>

          <aside className="blog-sidebar" aria-label="Blog sidebar">
            <div className="blog-widget">
              <h3>Recent Posts</h3>
              <ul className="blog-recent">
                {recentPosts
                  .filter((item) => String(item.id) !== String(postId))
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item.id}>
                      <Link className="blog-recent-link" to={`/blog/${item.id}`}>
                        <span className="blog-recent-title">{item.title}</span>
                        <span className="blog-recent-date">
                          {new Date(item.published_at).toLocaleDateString()}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="blog-widget">
              <h3>Need Help?</h3>
              <p className="blog-support-copy">
                Reach out if you want details about supply, quality standards, or ongoing farm operations.
              </p>
              <Link className="blog-readmore" to="/contact">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
