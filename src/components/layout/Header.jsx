import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

const LazyLanyard = lazy(() => import('../common/Lanyard.jsx'))

class LanyardErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Lanyard disabled after a render error:', error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function HeaderLanyard() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      const desktopWidth = window.innerWidth >= 980
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      setShouldRender(desktopWidth && canHover && !mediaQuery.matches)
    }

    update()
    mediaQuery.addEventListener('change', update)
    window.addEventListener('resize', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <LanyardErrorBoundary>
      <Suspense fallback={null}>
        <LazyLanyard />
      </Suspense>
    </LanyardErrorBoundary>
  )
}

function getPreferredImageUrl(imageUrls, preferredNames) {
  for (const name of preferredNames) {
    if (imageUrls[name]) return imageUrls[name]
  }

  const entries = Object.entries(imageUrls)
  for (const preferredName of preferredNames) {
    const match = entries.find(([imageName]) => imageName.toLowerCase() === preferredName.toLowerCase())
    if (match) return match[1]
  }

  return ''
}

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
  const brandLogo = getPreferredImageUrl(imageUrls, ['logo.png', 'Om.jpg', 'Omega.png'])

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
          <p>Omega Dairy Pvt. Ltd. | Precision agriculture and premium dairy operations</p>
          <div className="topbar-actions">
            <span>Karachi, Pakistan</span>
            <a href="tel:+923001112233">+92-3065230410</a>
          </div>
        </div>
      </header>

      <nav ref={navRef} className={`main-nav ${navHidden ? 'is-hidden' : ''}`}>
        <div className="site-container nav-inner">
          <div className="brand-with-lanyard">
            <Link to="/" className="brand" onClick={closeMenu}>
              {brandLogo ? <img src={brandLogo} alt="Omega" /> : 'Omega'}
            </Link>
            <HeaderLanyard />
          </div>

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

          <div className="nav-cta-group">
            <Link to="/contact" className="btn btn-accent" onClick={closeMenu}>
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
