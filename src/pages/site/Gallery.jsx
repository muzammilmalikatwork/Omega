import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useDatabaseImages from '../../hooks/media/useDatabaseImages.jsx'

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
    imageName: 'cow.jpg',
  },
  {
    title: 'Modern Tractor Setup',
    text: 'Field-ready machinery configured for efficient farm operations.',
    category: 'equipment',
    imageName: 'services.jpg',
  },
  {
    title: 'Active Crop Field',
    text: 'Seasonal cultivation with planned irrigation and monitoring.',
    category: 'farming',
    imageName: 'c.jpg',
  },
  {
    title: 'Organic Harvest Basket',
    text: 'Fresh organic produce collected and packed from local fields.',
    category: 'organic',
    imageName: 'co.jpg',
  },
  {
    title: 'Dairy Cattle Care',
    text: 'Daily shelter maintenance and nutrition planning for dairy herds.',
    category: 'cattles',
    imageName: 'about.jpg',
  },
  {
    title: 'Farm Equipment Maintenance',
    text: 'Preventive checks to keep tools and machines reliable in season.',
    category: 'equipment',
    imageName: 'services.jpg',
  },
  {
    title: 'Irrigation Monitoring',
    text: 'Water channels and growth patterns reviewed across farm plots.',
    category: 'farming',
    imageName: 'about1.jpeg',
  },
  {
    title: 'Organic Crop Sorting',
    text: 'Natural produce sorted for freshness and quality consistency.',
    category: 'organic',
    imageName: 'co.jpg',
  },
]

const farmMarks = [
  { label: 'Chicken Farm', imageName: 'b-logo1.png' },
  { label: 'Milk Farm', imageName: 'b-logo2.png' },
  { label: 'Family Farm', imageName: 'b-logo3.png' },
  { label: 'Farm Meat', imageName: 'b-logo4.png' },
  { label: 'Goose Farm', imageName: 'b-logo5.png' },
]

const visibleBrandCount = 4

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [brandIndex, setBrandIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDraggingBrands, setIsDraggingBrands] = useState(false)
  const [brandTransitionEnabled, setBrandTransitionEnabled] = useState(true)
  const brandDragStartX = useRef(null)
  const images = useDatabaseImages()
  const galleryHeroImage = images['about1.jpeg']

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
      <section
        className="services-breadcrumb"
        style={{ backgroundImage: galleryHeroImage ? `url(${galleryHeroImage})` : undefined }}
      >
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
              <img src={images[item.imageName] || ''} alt={item.title} />
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
                  <img src={images[item.imageName] || ''} alt={item.label} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

