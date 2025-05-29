"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import api from "../utils/axios"
import { useSocket } from "../hooks/useSocket"
import PhotoCarousel from "../components/PhotoCarousel"
import BidHistory from "../components/BidHistory"
import BidForm from "../components/BidForm"
import Button from "../components/ui/Button"

const AuctionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [highestBid, setHighestBid] = useState(null)

  const {
    data: auction,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auction", id],
    queryFn: async () => {
      const response = await api.get(`/auctions/${id}`)
      return response.data
    },
  })

  const { data: bids, isLoading: isLoadingBids } = useQuery({
    queryKey: ["bids", id],
    queryFn: async () => {
      const response = await api.get(`/auctions/${id}/bids`)
      return response.data
    },
    enabled: !!auction,
    onSuccess: (data) => {
      if (data.length > 0) {
        const sorted = [...data].sort((a, b) => b.amount - a.amount)
        setHighestBid(sorted[0])  // store entire bid object
      } else {
        setHighestBid(null)
      }
    },
  })

  const placeBidMutation = useMutation({
    mutationFn: async (bidData) => {
      const response = await api.post(`/auctions/${id}/bids`, bidData)
      return response.data
    },
    onSuccess: (data) => {
      toast.success("Bid placed successfully!")
      queryClient.invalidateQueries(["bids", id])
      setHighestBid(data)  // set full bid object
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to place bid")
    },
  })

  useSocket(`auction:${id}`, (data) => {
    if (data.event === "new_bid") {
      setHighestBid(data)  // assuming backend emits full bid object
      queryClient.invalidateQueries(["bids", id])
      toast.info(`New bid: ₹${data.amount.toFixed(2)} by ${data.bidderName}`)
    }
  })

  const isActive = auction && new Date(auction.deadline) > new Date()

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleBidSubmit = async (bidData) => {
    try {
      await placeBidMutation.mutateAsync(bidData)
      return true
    } catch {
      return false
    }
  }

  if (isLoading) {
    return (
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
    )
  }

  if (error || !auction) {
    return (
        <div className="card text-center py-8">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Auction</h2>
          <p className="text-gray-600 mb-6">The auction you're looking for could not be found or has been removed.</p>
          <Button variant="primary" onClick={() => {
            const role = localStorage.getItem("role")
            navigate(role === "farmer" ? "app/farmer" : "app/buyer")
          }}>
            Return to Auctions
          </Button>
        </div>
    )
  }

  return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{auction.cropName}</h1>
            <p className="text-gray-600">Variety: {auction.variety}</p>
          </div>

          <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {isActive ? "Active" : "Closed"}
          </span>

            {isActive && (
                <span className="text-sm text-gray-600">
              Ends: {formatDate(auction.deadline)}
            </span>
            )}

            <Button variant="outline" size="sm" onClick={() => {
              const role = localStorage.getItem("role")
              navigate(role === "farmer" ? "/app/farmer" : "/app/buyer")
            }}>
              Back to Auctions
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <PhotoCarousel photos={auction.photos || []} />

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Crop Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <Detail label="Crop Name" value={auction.cropName} />
                <Detail label="Variety" value={auction.variety} />
                <Detail label="Weight" value={`${auction.weight} kg`} />
                <Detail label="Location" value={auction.location} />
                <Detail label="Base Price" value={`₹${auction.basePrice.toFixed(2)}`} />
                <Detail
                    label="Current Bid"
                    value={
                      highestBid ? (
                          <span className="font-bold text-green-700">₹{highestBid.amount.toFixed(2)}</span>
                      ) : (
                          "No bids yet"
                      )
                    }
                />
              </div>

              {auction.description && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-700">{auction.description}</p>
                  </div>
              )}
            </div>

            <BidHistory bids={bids} isLoading={isLoadingBids} />
          </div>

          <div>
            {isActive ? (
                <BidForm
                    auctionId={auction.id}
                    currentBid={highestBid}
                    basePrice={auction.basePrice}
                    onSubmit={handleBidSubmit}
                    isSubmitting={placeBidMutation.isLoading}
                />
            ) : (
                <div className="card bg-red-50 border border-red-100">
                  <h3 className="text-lg font-medium mb-4">Auction Closed</h3>
                  <p className="text-gray-700 mb-4">This auction has ended and is no longer accepting bids.</p>
                  <div className="p-4 bg-white rounded-md border border-gray-200">
                    <h4 className="font-medium mb-2">Final Result</h4>
                    {highestBid ? (
                        <>
                          <p className="text-lg font-bold text-green-700">Winning Bid: ₹{highestBid.amount.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Winner: {highestBid.bidderName}</p>
                        </>
                    ) : (
                        <p className="text-gray-700">No bids were placed on this auction.</p>
                    )}
                  </div>
                </div>
            )}

            <div className="card mt-6">
              <h3 className="text-lg font-medium mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{auction.farmerName}</p>
                  <p className="text-sm text-gray-600">{auction.farmerLocation}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-1">Member since: {formatDate(auction.farmerJoinDate)}</p>
                <p>Auctions completed: {auction.farmerCompletedAuctions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

const Detail = ({ label, value }) => (
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-lg">{value}</p>
    </div>
)

export default AuctionDetail
