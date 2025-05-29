import axios from "axios"
import { toast } from "react-toastify"

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

// Add JWT token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || "An error occurred"

        // Handle authentication errors
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
            toast.error("Your session has expired. Please log in again.")
        } else {
            toast.error(message)
        }

        return Promise.reject(error)
    },
)

export default api
