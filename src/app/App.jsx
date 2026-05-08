import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import '../styles/App.css'
import Footer from '../components/layout/Footer.jsx'
import Header from '../components/layout/Header.jsx'
import ScrollToTop from '../components/layout/ScrollToTop.jsx'
import AdminDashboard from '../pages/admin/AdminDashboardModern.jsx'
import Login from '../pages/auth/Login.jsx'
import Signup from '../pages/auth/Signup.jsx'
import About from '../pages/site/About.jsx'
import Blog from '../pages/site/Blog.jsx'
import BlogPost from '../pages/site/BlogPost.jsx'
import CeoMessage from '../pages/site/CeoMessage.jsx'
import Contact from '../pages/site/Contact.jsx'
import Faq from '../pages/site/Faq.jsx'
import Gallery from '../pages/site/Gallery.jsx'
import Home from '../pages/site/Home.jsx'
import NotFoundPage from '../pages/site/NotFoundPage.jsx'
import Pricing from '../pages/site/Pricing.jsx'
import Services from '../pages/site/Services.jsx'
import Team from '../pages/site/Team.jsx'
import Unit1 from '../pages/site/Unit1.jsx'
import Unit2 from '../pages/site/Unit2.jsx'
import Unit3 from '../pages/site/Unit3.jsx'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const siteRef = useRef(null)

  useEffect(() => {
    if (isAdminRoute) return undefined

    const root = siteRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.style.setProperty('--site-pointer-x', '50%')
    root.style.setProperty('--site-pointer-y', '18%')

    if (reduceMotion) return undefined

    let frame = 0

    const updatePointer = (event) => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        root.style.setProperty('--site-pointer-x', `${Math.max(0, Math.min(100, x))}%`)
        root.style.setProperty('--site-pointer-y', `${Math.max(0, Math.min(100, y))}%`)
      })
    }

    const resetPointer = () => {
      root.style.setProperty('--site-pointer-x', '50%')
      root.style.setProperty('--site-pointer-y', '18%')
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerleave', resetPointer)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerleave', resetPointer)
    }
  }, [isAdminRoute])

  useEffect(() => {
    if (isAdminRoute) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer =
      !reduceMotion &&
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
      )

    const groupedSelectors = [
      '.services-breadcrumb-inner > *',
      '.section .site-container > *',
      '.cards-3 > *',
      '.home-blog-grid > *',
      '.home-testimonial-grid > *',
      '.home-services-grid > *',
      '.home-products-grid > *',
      '.home-process-grid > *',
      '.stats-grid > *',
      '.services-grid > *',
      '.about-template-testimonial-grid > *',
      '.about-template-team-grid > *',
      '.about-step-list > *',
      '.about-template-story > *',
      '.unit-members-grid > *',
      '.unit-gallery-grid > *',
      '.members-grid > *',
      '.pricing-showcase-grid > *',
      '.services-template-row > *',
      '.gallery-filter-row > *',
      '.services-template-head > *',
      '.team-showcase-grid > *',
    ]

    const standaloneSelectors = [
      '.hero-content',
      '.stats-strip',
      '.ceo-message-card',
      '.services-brand-row',
      '.gallery-brand-track',
      '.footer-grid > *',
    ]

    const markReveal = (element, index = 0) => {
      if (!(element instanceof HTMLElement) || element.dataset.revealBound === 'true') return
      element.dataset.revealBound = 'true'
      element.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 80}ms`)
      element.classList.add('reveal-on-scroll')
      if (reduceMotion) {
        element.classList.add('is-visible')
        return
      }
      observer.observe(element)
    }

    const frame = window.requestAnimationFrame(() => {
      groupedSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element, index) => markReveal(element, index))
      })

      standaloneSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => markReveal(element, 0))
      })
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (observer) observer.disconnect()
      document.querySelectorAll('.reveal-on-scroll').forEach((element) => {
        element.classList.remove('reveal-on-scroll', 'is-visible')
        element.removeAttribute('data-reveal-bound')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [isAdminRoute, location.pathname])

  return (
    <div ref={siteRef} className="omega-site">
      <ScrollToTop />
      {!isAdminRoute && (
        <div className="site-vfx" aria-hidden="true">
          <span className="site-vfx-spotlight" />
          <span className="site-vfx-orb site-vfx-orb--gold" />
          <span className="site-vfx-orb site-vfx-orb--green" />
          <span className="site-vfx-grid" />
          <span className="site-vfx-beam site-vfx-beam--one" />
          <span className="site-vfx-beam site-vfx-beam--two" />
        </div>
      )}
      <Header />
      <main className="site-main">
        <div key={location.pathname} className="route-stage">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ceo-message" element={<CeoMessage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/unit-1" element={<Unit1 />} />
            <Route path="/unit-2" element={<Unit2 />} />
            <Route path="/unit-3" element={<Unit3 />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

