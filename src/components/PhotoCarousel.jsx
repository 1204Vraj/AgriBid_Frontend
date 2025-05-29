"use client"

import { useState } from "react"
import PropTypes from "prop-types"

const PhotoCarousel = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!photos || photos.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64">
        <p className="text-gray-500">No photos available</p>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={photos[currentIndex] || "/placeholder.svg"}
          alt={`Crop photo ${currentIndex + 1}`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
            aria-label="Previous photo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
            aria-label="Next photo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots indicator */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full focus:outline-none ${
                index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

PhotoCarousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PhotoCarousel
