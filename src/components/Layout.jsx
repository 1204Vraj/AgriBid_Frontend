"use client"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {useAuth} from "../hooks/useAuth"
import Button from "./ui/Button"

const Layout = () => {
  const { role, user } = useSelector((state) => state.auth)
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Crop Auction</h1>
            {role === "farmer" && (
              <nav className="hidden md:flex space-x-4">
                <Link to="/app/farmer" className="hover:text-green-200">
                  Dashboard
                </Link>
                <Link to="/app/farmer/new-auction" className="hover:text-green-200">
                  New Auction
                </Link>
              </nav>
            )}
            {role === "buyer" && (
              <nav className="hidden md:flex space-x-4">
                <Link to="/app/buyer" className="hover:text-green-200">
                  Browse Auctions
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user && <span className="hidden md:inline-block">Welcome, {user.name}</span>}
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-green-600" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Crop Auction Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
