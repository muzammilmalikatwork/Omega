import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <h3>Omega</h3>
          <p>
            Modern agriculture and dairy farm solutions with a focus on quality, sustainability, and trusted supply.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/gallery">Pages</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>45 Green Valley Road, Lahore</li>
            <li>+92 300 1112233</li>
            <li>hello@omegafarm.com</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <div className="site-container">
          <p>Copyright {new Date().getFullYear()} Omega Farm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
