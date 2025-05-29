"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import api from "../utils/axios"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

// Form validation schema
const auctionSchema = z.object({
  cropName: z.string().min(2, "Crop name is required"),
  variety: z.string().min(2, "Variety is required"),
  weight: z.number().min(1, "Weight must be at least 1 kg"),
  location: z.string().min(2, "Location is required"),
  basePrice: z.number().min(1, "Base price must be at least $1"),
  description: z.string().optional(),
  deadline: z.string().refine((date) => new Date(date) > new Date(), { message: "Deadline must be in the future" }),
})

const NewAuction = () => {
  const navigate = useNavigate()
  const [photos, setPhotos] = useState([])
  const [photoErrors, setPhotoErrors] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(auctionSchema),
    defaultValues: {
      cropName: "",
      variety: "",
      weight: 0,
      location: "",
      basePrice: 0,
      description: "",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Default to 7 days from now
    },
  })

  // Create auction mutation
  const createAuctionMutation = useMutation({
    mutationFn: async (data) => {
      // Create form data for file upload
      const formData = new FormData()

      // Add all form fields
      Object.keys(data).forEach((key) => {
        if (key !== "photos") {
          formData.append(key, data[key])
        }
      })

      // Add photos
      photos.forEach((photo) => {
        formData.append("photos", photo)
      })

      const response = await api.post("/auctions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    },
    onSuccess: () => {
      toast.success("Auction created successfully!")
      navigate("/app/farmer")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create auction")
    },
  })

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)

    // Validate file count
    if (photos.length + files.length > 5) {
      setPhotoErrors("You can upload a maximum of 5 photos")
      return
    }

    // Validate file types and sizes
    const invalidFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB max
      return !isValidType || !isValidSize
    })

    if (invalidFiles.length > 0) {
      setPhotoErrors("Only JPG, PNG, and WebP images under 5MB are allowed")
      return
    }

    setPhotoErrors("")
    setPhotos((prevPhotos) => [...prevPhotos, ...files])
  }

  // Remove a photo
  const removePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index))
  }

  // Handle form submission
  const onSubmit = (data) => {
    if (photos.length === 0) {
      setPhotoErrors("Please upload at least one photo")
      return
    }

    createAuctionMutation.mutate(data)
  }

  // Go to next step
  const goToNextStep = () => {
    setCurrentStep(2)
  }

  // Go back to previous step
  const goToPreviousStep = () => {
    setCurrentStep(1)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Auction</h1>
        <p className="text-gray-600">List your crops for auction in just a few steps</p>
      </div>

      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-green-600" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium">Crop Details</span>
          <span className="text-sm font-medium">Photos & Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Crop Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Crop Name" {...register("cropName")} error={errors.cropName?.message} />

              <Input label="Variety" {...register("variety")} error={errors.variety?.message} />

              <Input
                label="Weight (kg)"
                type="number"
                min="1"
                step="0.1"
                {...register("weight", { valueAsNumber: true })}
                error={errors.weight?.message}
              />

              <Input label="Location" {...register("location")} error={errors.location?.message} />

              <Input
                label="Base Price ($)"
                type="number"
                min="1"
                step="0.01"
                {...register("basePrice", { valueAsNumber: true })}
                error={errors.basePrice?.message}
              />

              <Input
                label="Bidding Deadline"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("deadline")}
                error={errors.deadline?.message}
              />
            </div>

            <div className="mt-4">
              <label className="form-label">Description (Optional)</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                {...register("description")}
              ></textarea>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="button" onClick={goToNextStep}>
                Next: Add Photos
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Upload Photos</h2>

            <div className="mb-6">
              <label className="form-label">Crop Photos (Max 5)</label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Drag and drop photos here, or click to select files</p>
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG, WebP up to 5MB (Max 5 photos)</p>
                </label>
              </div>
              {photoErrors && <p className="form-error mt-2">{photoErrors}</p>}

              {photos.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Uploaded Photos ({photos.length}/5)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo) || "/placeholder.svg"}
                          alt={`Crop photo ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          aria-label="Remove photo"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Review Auction Details</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Crop Name</p>
                  <p className="font-medium">{watch("cropName")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Variety</p>
                  <p className="font-medium">{watch("variety")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{watch("weight")} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{watch("location")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Base Price</p>
                  <p className="font-medium">${watch("basePrice")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bidding Deadline</p>
                  <p className="font-medium">{new Date(watch("deadline")).toLocaleDateString()}</p>
                </div>
              </div>

              {watch("description") && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{watch("description")}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                Back
              </Button>
              <Button type="submit" isLoading={createAuctionMutation.isLoading}>
                Create Auction
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default NewAuction
