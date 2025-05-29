"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Login from "./pages/Login"
import FarmerDashboard from "./pages/FarmerDashboard"
import BuyerDashboard from "./pages/BuyerDashboard"
import AuctionDetail from "./pages/AuctionDetail"
import NewAuction from "./pages/NewAuction"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage"
import {restoreUser, setInitialized} from "./store/authSlice"
import Signup from "./pages/Signup"

function App() {
  const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            dispatch(restoreUser())
        } else {
            // No token found — mark auth initialized so routes don't wait forever
            dispatch(setInitialized())
        }
    }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/app" element={<Layout />}>
          {/* Farmer Routes */}
          <Route
            path="farmer"
            element={
              <ProtectedRoute role="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="farmer/NewAuction"
            element={
              <ProtectedRoute role="farmer">
                <NewAuction />
              </ProtectedRoute>
            }
          />

          {/* Buyer Routes */}
          <Route
            path="buyer"
            element={
              <ProtectedRoute role="buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="auctions/:id"
            element={
              <ProtectedRoute>
                <AuctionDetail />
              </ProtectedRoute>
            }
          />

          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
