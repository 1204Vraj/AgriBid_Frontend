"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { login } from "../store/authSlice"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("farmer") // default role

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, role, loading, error } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated && role) {
      if (role === "farmer") {
        navigate("/app/farmer")
      } else if (role === "buyer") {
        navigate("/app/buyer")
      } else {
        navigate("/")
      }
    }
  }, [isAuthenticated, role, navigate])

  const onSubmit = (data) => {
    dispatch(login({ email: data.email, password: data.password, role: selectedRole }))
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Crop Auction</h1>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Sign in to your account</h2>
          </div>

          {/*<div className="flex justify-center space-x-4 mb-6">*/}
          {/*  <button*/}
          {/*      type="button"*/}
          {/*      className={`px-4 py-2 rounded ${selectedRole === "farmer" ? "bg-blue-600 text-white" : "bg-gray-200"}`}*/}
          {/*      onClick={() => setSelectedRole("farmer")}*/}
          {/*  >*/}
          {/*    Farmer*/}
          {/*  </button>*/}
          {/*  <button*/}
          {/*      type="button"*/}
          {/*      className={`px-4 py-2 rounded ${selectedRole === "buyer" ? "bg-blue-600 text-white" : "bg-gray-200"}`}*/}
          {/*      onClick={() => setSelectedRole("buyer")}*/}
          {/*  >*/}
          {/*    Buyer*/}
          {/*  </button>*/}
          {/*</div>*/}

          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  error={errors.email?.message}
              />

              <Input
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  error={errors.password?.message}
              />

              <div>
                <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                  Sign in
                </Button>
              </div>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>
        </div>
      </div>
  )
}

export default Login
