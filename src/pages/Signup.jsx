"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(100),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    location: z.string().optional(),
})

const Signup = () => {
    const [selectedRole, setSelectedRole] = useState("farmer")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            location: "",
        },
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    role: selectedRole
                })
            })

            if (!response.ok) {
                throw new Error("Signup failed")
            }

            const result = await response.json()
            alert("Signup successful! Please log in.")
            navigate("/login")
        } catch (error) {
            console.error("Signup error:", error)
            alert("Signup failed. Email may already be taken or server error.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Crop Auction</h1>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">Create a new account</h2>
                </div>

                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label="Full Name"
                            type="text"
                            autoComplete="name"
                            {...register("name")}
                            error={errors.name?.message}
                        />

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
                            autoComplete="new-password"
                            {...register("password")}
                            error={errors.password?.message}
                        />

                        <Input
                            label="Location (Optional)"
                            type="text"
                            autoComplete="address-level1"
                            {...register("location")}
                            error={errors.location?.message}
                        />

                        <div className="form-group">
                            <label className="form-label">I am a:</label>
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                <div
                                    className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium cursor-pointer
                  ${
                                        selectedRole === "farmer"
                                            ? "bg-green-50 border-green-500 text-green-700"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                    onClick={() => setSelectedRole("farmer")}
                                >
                                    <span>Farmer</span>
                                </div>
                                <div
                                    className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium cursor-pointer
                  ${
                                        selectedRole === "buyer"
                                            ? "bg-green-50 border-green-500 text-green-700"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                    onClick={() => setSelectedRole("buyer")}
                                >
                                    <span>Buyer</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                                Sign up
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <span
                            className="text-green-600 hover:underline cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
              Log in
            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
