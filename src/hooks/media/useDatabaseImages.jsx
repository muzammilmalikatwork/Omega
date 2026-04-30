import { useEffect, useMemo, useState } from 'react'

export default function useDatabaseImages() {
  const [imageMap, setImageMap] = useState({})

  useEffect(() => {
    let cancelled = false

    async function loadImages() {
      try {
        const response = await fetch('/api/images')
        const data = await response.json()
        if (!cancelled && data.success) {
          const mapped = data.images.reduce((acc, image) => {
            acc[image.image_name] = image.image_url
            return acc
          }, {})
          setImageMap(mapped)
        }
      } catch (error) {
        console.error('Unable to load images from database:', error)
      }
    }

    loadImages()
    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(() => imageMap, [imageMap])
}

