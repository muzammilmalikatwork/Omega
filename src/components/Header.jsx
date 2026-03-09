import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const location = useLocation()

  const pagesActive = ['/gallery', '/team', '/pricing', '/faq', '/not-found'].includes(location.pathname)

  const closeMenu = () => {
    setOpen(false)
    setPagesOpen(false)
  }

  return (
    <>
      <header className="topbar">
        <div className="site-container topbar-inner">
          <p>Omega Farm | Natural agriculture and dairy solutions</p>
          <a href="tel:+923001112233">Call Us: +92 300 1112233</a>
        </div>
      </header>

      <nav className="main-nav">
        <div className="site-container nav-inner">
          <Link to="/" className="brand" onClick={closeMenu}>
            Omega
          </Link>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`nav-menu ${open ? 'open' : ''}`}>
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              About Us
            </NavLink>
            <NavLink to="/services" onClick={closeMenu}>
              Services
            </NavLink>
            <div className={`nav-dropdown ${pagesOpen ? 'open' : ''}`}>
              <button
                className={`nav-dropdown-toggle ${pagesActive ? 'active' : ''}`}
                type="button"
                onClick={() => setPagesOpen((value) => !value)}
                aria-expanded={pagesOpen}
              >
                Pages
              </button>
              <div className="dropdown-menu">
                <NavLink to="/gallery" onClick={closeMenu}>
                  Gallery
                </NavLink>
                <NavLink to="/team" onClick={closeMenu}>
                  Team
                </NavLink>
                <NavLink to="/pricing" onClick={closeMenu}>
                  Pricing
                </NavLink>
                <NavLink to="/faq" onClick={closeMenu}>
                  FAQ
                </NavLink>
                <NavLink to="/not-found" onClick={closeMenu}>
                  404 Page
                </NavLink>
              </div>
            </div>
            <NavLink to="/blog" onClick={closeMenu}>
              Blog
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact Us
            </NavLink>
          </div>

          <Link to="/contact" className="btn btn-accent" onClick={closeMenu}>
            Get A Quote
          </Link>
        </div>
      </nav>
    </>
  )
}
