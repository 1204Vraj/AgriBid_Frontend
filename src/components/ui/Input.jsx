import { forwardRef } from "react"
import PropTypes from "prop-types"

const Input = forwardRef(({ type = "text", label, name, id, placeholder, error, className = "", ...props }, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  )
})

Input.displayName = "Input"

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
}

export default Input
