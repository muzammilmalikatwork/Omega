import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'


export default function Header() {
  const imageUrls = useDatabaseImages()
  const [open, setOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [navHidden, setNavHidden] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const rafRef = useRef(0)
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    let cancelled = false

    async function loadRole() {
      try {
        const response = await fetch('/api/me', { credentials: 'include' })
        if (!response.ok) {
          if (!cancelled) setUserRole(null)
          return
        }
        const data = await response.json()
        if (!cancelled) {
          const role = data.user?.role ?? null
          setUserRole(typeof role === 'string' ? role.toLowerCase() : role)
        }
      } catch {
        if (!cancelled) setUserRole(null)
      }
    }

    const handleAuthChange = () => {
      loadRole()
    }

    loadRole()
    window.addEventListener('omega-auth-changed', handleAuthChange)
    return () => {
      cancelled = true
      window.removeEventListener('omega-auth-changed', handleAuthChange)
    }
  }, [])

  const aboutActive = location.pathname === '/about'
  const pagesActive = ['/gallery', '/team', '/pricing', '/faq', '/not-found'].includes(location.pathname)
  const brandLogo = imageUrls['Om.jpg'] || imageUrls['Omega.png'] || ''

  const closeMenu = () => {
    setOpen(false)
    setPagesOpen(false)
  }

  useEffect(() => {
    const root = document.documentElement

    const setOffset = (hidden) => {
      if (hidden) {
        root.style.setProperty('--omega-nav-offset', '0px')
        return
      }

      const height = navRef.current?.getBoundingClientRect?.().height
      if (typeof height === 'number' && Number.isFinite(height)) {
        root.style.setProperty('--omega-nav-offset', `${Math.round(height)}px`)
      } else {
        root.style.setProperty('--omega-nav-offset', '80px')
      }
    }

    setOffset(navHidden)

    const handleResize = () => setOffset(navHidden)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [navHidden])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY || 0
    const frame = window.requestAnimationFrame(() => setNavHidden(false))
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname])

  useEffect(() => {
    if (!isAdminRoute) {
      const frame = window.requestAnimationFrame(() => setNavHidden(false))
      return () => window.cancelAnimationFrame(frame)
    }

    const threshold = 10
    const minScrollToHide = 120

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0
        if (open) return

        const currentY = window.scrollY || 0
        const lastY = lastScrollYRef.current
        const delta = currentY - lastY

        if (currentY < minScrollToHide) {
          if (navHidden) setNavHidden(false)
          lastScrollYRef.current = currentY
          return
        }

        if (delta > threshold) {
          if (!navHidden) setNavHidden(true)
        } else if (delta < -threshold) {
          if (navHidden) setNavHidden(false)
        }

        lastScrollYRef.current = currentY
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      window.removeEventListener('scroll', onScroll)
    }
  }, [isAdminRoute, navHidden, open])

  return (
    <>
      <header className="topbar">
        <div className="site-container topbar-inner">
          <p>Omega Farm | Natural agriculture and dairy solutions</p>
          <a href="tel:+923001112233">Call Us: +92-3065230410</a>
        </div>
      </header>

      <nav ref={navRef} className={`main-nav ${navHidden ? 'is-hidden' : ''}`}>
        <div className="site-container nav-inner">
          <Link to="/" className="brand" onClick={closeMenu}>
            {brandLogo ? <img src={brandLogo} alt="Omega" /> : 'Omega'}
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

            <NavLink to="/about" className={aboutActive ? 'active' : ''} onClick={closeMenu}>
              About Us
            </NavLink>

            <NavLink to="/ceo-message" onClick={closeMenu}>
              CEO Message
            </NavLink>

            <NavLink to="/services" onClick={closeMenu}>
              Services
            </NavLink>
            <div className={`nav-dropdown ${pagesOpen ? 'open' : ''}`}>
              <button
                className={`nav-dropdown-toggle ${pagesActive ? 'active' : ''}`}
                type="button"
                onClick={() => {
                  setPagesOpen((value) => !value)
                }}
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
            {userRole === 'admin' && (
              <NavLink to="/admin" onClick={closeMenu}>
                Admin
              </NavLink>
            )}
            <NavLink to="/login" onClick={closeMenu}>
              Login
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

