import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole, initialized } = useSelector((state) => state.auth)

  // Wait until auth state is initialized before rendering
  if (!initialized) {
    // You can show a loading spinner here if you want
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role && role !== userRole) {
    // Redirect to the correct dashboard based on actual role
    if (userRole === "farmer") {
      return <Navigate to="/app/farmer" replace />
    } else if (userRole === "buyer") {
      return <Navigate to="/app/buyer" replace />
    } else {
      // fallback redirect
      return <Navigate to="/" replace />
    }
  }

  return children
}

export default ProtectedRoute
