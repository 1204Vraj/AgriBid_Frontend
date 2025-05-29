"use client"

import { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { createPortal } from "react-dom"

const Modal = ({ isOpen, onClose, title, children, footer, size = "md", closeOnClickOutside = true }) => {
  const modalRef = useRef(null)

  // Close on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto" // Restore scrolling when modal is closed
    }
  }, [isOpen, onClose])

  // Handle click outside
  const handleClickOutside = (e) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none" aria-label="Close">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">{children}</div>

        {footer && <div className="flex justify-end gap-2 p-4 border-t">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  closeOnClickOutside: PropTypes.bool,
}

export default Modal
