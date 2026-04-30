import { Link } from 'react-router-dom'

const socialLinks = {
  facebook: 'https://www.facebook.com/omegadairypvtltd',
  instagram: 'https://www.instagram.com/omegadairypvt.ltd?igsh=bWdsdHZ6b2Z3bW9u',
  linkedin: 'https://www.linkedin.com/company/omega-dairy-pvt-ltd/',
  youtube: 'https://www.youtube.com/@OmegaDairy',
}

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
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.94 6.5A2.18 2.18 0 1 1 7 2.14a2.18 2.18 0 0 1-.06 4.36ZM5 21V8h4v13H5Zm6.5 0V8h3.8v1.78h.05c.53-1 1.84-2.06 3.79-2.06c4.05 0 4.8 2.66 4.8 6.12V21h-4v-5.46c0-1.3-.02-2.98-1.81-2.98c-1.81 0-2.09 1.42-2.09 2.88V21h-4Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2A31.2 31.2 0 0 0 2 12s.1 3.4.4 4.8a3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1c.3-1.4.4-4.8.4-4.8s-.1-3.4-.4-4.8ZM10.2 15.2V8.8L15.7 12l-5.5 3.2Z" />
    </svg>
  ),
}

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

          <div className="footer-socials" aria-label="Social links">
            {Object.entries(socialIcons).map(([key, icon]) => (
              <a
                key={key}
                href={socialLinks[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
              >
                {icon}
              </a>
            ))}
          </div>
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

