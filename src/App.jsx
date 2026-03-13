import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Gallery from './pages/Gallery.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import Team from './pages/Team.jsx'
import Pricing from './pages/Pricing.jsx'
import Faq from './pages/Faq.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import CeoMessage from './pages/CeoMessage.jsx'
import Unit1 from './pages/Unit1.jsx'
import Unit2 from './pages/Unit2.jsx'
import Unit3 from './pages/Unit3.jsx'

export default function App() {
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
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
