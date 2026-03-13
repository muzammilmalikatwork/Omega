import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import brandLogo1 from '../../image/b-logo1.png'
import brandLogo2 from '../../image/b-logo2.png'
import brandLogo3 from '../../image/b-logo3.png'
import brandLogo4 from '../../image/b-logo4.png'
import brandLogo5 from '../../image/b-logo5.png'

const galleryHeroImage =
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80'

const filterOptions = [
  { label: 'View All', value: 'all' },
  { label: 'Cattles', value: 'cattles' },
  { label: 'Equipment', value: 'equipment' },
  { label: 'Farming', value: 'farming' },
  { label: 'Organic', value: 'organic' },
]

const galleryItems = [
  {
    title: 'Healthy Cattle Group',
    text: 'Well-nourished cattle under routine health management.',
    category: 'cattles',
    image:
      'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Modern Tractor Setup',
    text: 'Field-ready machinery configured for efficient farm operations.',
    category: 'equipment',
    image:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Active Crop Field',
    text: 'Seasonal cultivation with planned irrigation and monitoring.',
    category: 'farming',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Organic Harvest Basket',
    text: 'Fresh organic produce collected and packed from local fields.',
    category: 'organic',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Dairy Cattle Care',
    text: 'Daily shelter maintenance and nutrition planning for dairy herds.',
    category: 'cattles',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Farm Equipment Maintenance',
    text: 'Preventive checks to keep tools and machines reliable in season.',
    category: 'equipment',
    image:
      'https://images.unsplash.com/photo-1592982537447-6f2a6a0ad67d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Irrigation Monitoring',
    text: 'Water channels and growth patterns reviewed across farm plots.',
    category: 'farming',
    image:
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Organic Crop Sorting',
    text: 'Natural produce sorted for freshness and quality consistency.',
    category: 'organic',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
]

const farmMarks = [
  { label: 'Chicken Farm', image: brandLogo1 },
  { label: 'Milk Farm', image: brandLogo2 },
  { label: 'Family Farm', image: brandLogo3 },
  { label: 'Farm Meat', image: brandLogo4 },
  { label: 'Goose Farm', image: brandLogo5 },
]

const visibleBrandCount = 4

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [brandIndex, setBrandIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDraggingBrands, setIsDraggingBrands] = useState(false)
  const [brandTransitionEnabled, setBrandTransitionEnabled] = useState(true)
  const brandDragStartX = useRef(null)

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems
    return galleryItems.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  const farmMarksForTrack = useMemo(
    () => [...farmMarks, ...farmMarks.slice(0, visibleBrandCount)],
    []
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBrandIndex((currentIndex) => currentIndex + 1)
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [])

  const handleBrandPointerDown = (event) => {
    brandDragStartX.current = event.clientX
    setIsDraggingBrands(true)
    setBrandTransitionEnabled(false)
  }

  const handleBrandPointerMove = (event) => {
    if (!isDraggingBrands || brandDragStartX.current === null) return
    setDragOffset(event.clientX - brandDragStartX.current)
  }

  const handleBrandPointerEnd = () => {
    if (!isDraggingBrands) return

    const swipeThreshold = 60
    if (dragOffset <= -swipeThreshold) {
      setBrandIndex((currentIndex) => currentIndex + 1)
    } else if (dragOffset >= swipeThreshold && brandIndex > 0) {
      setBrandIndex((currentIndex) => currentIndex - 1)
    }

    setBrandTransitionEnabled(true)
    setIsDraggingBrands(false)
    brandDragStartX.current = null
    setDragOffset(0)
  }

  const handleBrandTrackTransitionEnd = () => {
    if (brandIndex < farmMarks.length) return
    setBrandTransitionEnabled(false)
    setBrandIndex(0)
  }

  useEffect(() => {
    if (brandTransitionEnabled) return
    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setBrandTransitionEnabled(true))
    })
    return () => window.cancelAnimationFrame(frameId)
  }, [brandTransitionEnabled])

  return (
    <>
      <section className="services-breadcrumb" style={{ backgroundImage: `url(${galleryHeroImage})` }}>
        <div className="site-container services-breadcrumb-inner">
          <h1>Our Gallery</h1>
          <div className="services-crumb-pill" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Our Gallery</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="gallery-filter-row" role="tablist" aria-label="Gallery Categories">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`gallery-filter-btn ${activeFilter === option.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container cards-3 page-cards">
          {filteredItems.map((item) => (
            <article key={item.title} className="service-card">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery-brand-strip">
        <div className="site-container">
          <div
            className={`gallery-brand-viewport ${isDraggingBrands ? 'dragging' : ''}`}
            onPointerDown={handleBrandPointerDown}
            onPointerMove={handleBrandPointerMove}
            onPointerUp={handleBrandPointerEnd}
            onPointerCancel={handleBrandPointerEnd}
            onPointerLeave={handleBrandPointerEnd}
          >
            <div
              className={`gallery-brand-track ${brandTransitionEnabled ? 'with-transition' : ''}`}
              onTransitionEnd={handleBrandTrackTransitionEnd}
              style={{
                transform: `translateX(calc(${-((brandIndex * 100) / visibleBrandCount)}% + ${dragOffset}px))`,
              }}
            >
              {farmMarksForTrack.map((item, index) => (
                <article key={`${item.label}-${index}`} className="gallery-brand-mark">
                  <img src={item.image} alt={item.label} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
