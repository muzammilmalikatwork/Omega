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

  return (
    <div className="omega-site">
      <ScrollToTop />
      <Header />
      <main>
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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

