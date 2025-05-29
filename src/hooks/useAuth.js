"use client"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, logout } from "../store/authSlice"

export function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, role, isAuthenticated, loading, error } = useSelector((state) => state.auth)

  const loginUser = async (credentials, selectedRole) => {
    const result = await dispatch(login({ ...credentials, role: selectedRole }))

    if (result.meta.requestStatus === "fulfilled") {
      // Redirect based on role
      navigate(selectedRole === "farmer" ? "/app/farmer" : "/app/buyer")
      return true
    }

    return false
  }

  const logoutUser = async () => {
    await dispatch(logout())
    navigate("/login")
  }

  return {
    user,
    role,
    isAuthenticated,
    loading,
    error,
    login: loginUser,
    logout: logoutUser,
  }
}
