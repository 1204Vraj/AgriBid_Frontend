import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../utils/axios"
import { toast } from "react-toastify"

// Async thunk for login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password, role }, { rejectWithValue }) => {
      try {
        const response = await api.post("/auth/login", {
          email: email.trim(),
          password,
          role: role.toLowerCase(),
        })
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.user.role)
        return response.data
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Login failed" })
      }
    }
)

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    localStorage.clear()
    await api.post("/auth/logout")
    return null
  } catch (error) {
    localStorage.removeItem("token")
    return rejectWithValue(error.response?.data || { message: "Logout failed" })
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: localStorage.getItem("role") || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
    initialized: false, // <-- added flag here
  },
  reducers: {
    restoreUser: (state) => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const base64Url = token.split(".")[1]
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
          const jsonPayload = decodeURIComponent(
              atob(base64)
                  .split("")
                  .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                  .join("")
          )
          const { user } = JSON.parse(jsonPayload)
          state.user = user
          state.role = user?.role
          state.isAuthenticated = true
        } else {
          state.user = null
          state.role = null
          state.token = null
          state.isAuthenticated = false
        }
      } catch (error) {
        localStorage.removeItem("token")
        state.user = null
        state.role = null
        state.token = null
        state.isAuthenticated = false
      }
      state.initialized = true
    },
    clearAuthError: (state) => {
      state.error = null
    },
    setInitialized: (state) => {
      state.initialized = true
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false
          state.user = action.payload.user
          state.role = action.payload.user.role
          state.token = action.payload.token
          state.isAuthenticated = true
          state.initialized = true
          toast.success("Login successful")
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload?.message || "Login failed"
          state.initialized = true
          toast.error(state.error)
        })
        .addCase(logout.fulfilled, (state) => {
          state.loading = false
          state.user = null
          state.role = null
          state.token = null
          state.isAuthenticated = false
          state.initialized = true
          toast.success("Logged out successfully")
        })
  },
})

export const { restoreUser, clearAuthError, setInitialized } = authSlice.actions

export default authSlice.reducer
