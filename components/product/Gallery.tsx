"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GalleryProps {
  images: string[]
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState("")

  React.useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0])
    }
  }, [images])

  const [isZoomed, setIsZoomed] = React.useState(false)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

    setMousePos({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100,
    })
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-24 lg:shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 lg:w-full lg:h-24 rounded-sm border-2 overflow-hidden ${
              selectedImage === img
                ? "border-primary"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      <div
        className="relative w-full aspect-square bg-secondary rounded-sm overflow-hidden"
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
            className="w-full h-full"
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt=""
                className="w-full h-full object-contain"
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                  transition: "transform .2s",
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}