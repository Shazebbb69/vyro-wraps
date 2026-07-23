"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GalleryProps {
  images: string[]
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState(images[0])
  const [isZoomed, setIsZoomed] = React.useState(false)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePos({ x, y })
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-24 lg:shrink-0 pb-2 lg:pb-0 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative w-20 h-20 lg:w-full lg:h-24 flex-shrink-0 rounded-sm border-2 overflow-hidden transition-all ${
              selectedImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            {/* Using div as placeholder for demo, replace with next/image */}
            <div 
              className="w-full h-full bg-secondary/50 bg-cover bg-center" 
              style={{ backgroundImage: `url(https://placehold.co/100x100/1A1A1A/FFFFFF?text=Thumb+${idx+1})` }}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full aspect-square bg-secondary/20 rounded-sm overflow-hidden flex-1 group">
        <div
          className="absolute inset-0 cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <div 
                className="w-full h-full bg-cover transition-transform duration-200"
                style={{
                  backgroundImage: `url(https://placehold.co/800x800/1A1A1A/FFFFFF?text=Vyro+Wraps)`,
                  backgroundPosition: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : "center",
                  backgroundSize: isZoomed ? "200%" : "cover",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Helper text */}
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur text-xs px-2 py-1 rounded-sm text-muted-foreground pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Hover to zoom
        </div>
      </div>
    </div>
  )
}
