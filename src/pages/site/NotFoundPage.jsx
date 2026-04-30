import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="section notfound-wrap">
      <div className="site-container notfound-box">
        <p className="section-tag">Error Page</p>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          Back To Home
        </Link>
      </div>
    </section>
  )
}

