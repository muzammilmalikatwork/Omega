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
            <li> G 4/9 Block 9 Scheme 9 Clifton-Karachi.</li>
            <li> +92-2135867726</li>
            <li>info@omegadairy.com.pk</li>
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
