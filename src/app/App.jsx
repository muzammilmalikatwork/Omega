import { useEffect } from 'react'
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
      '.unit-members-grid > *',
      '.unit-gallery-grid > *',
      '.members-grid > *',
      '.pricing-showcase-grid > *',
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
    <div className="omega-site">
      <ScrollToTop />
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

