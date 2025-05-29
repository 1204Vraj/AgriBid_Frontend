"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "../utils/axios"
import SearchForm from "../components/SearchForm"
import AuctionCard from "../components/AuctionCard"

const BuyerDashboard = () => {
  const [searchParams, setSearchParams] = useState({
    cropName: "",
    region: "All Regions",
  })

  // Fetch auctions with search parameters
  const {
    data: auctions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["auctions", searchParams],
    queryFn: async () => {
      const params = {}
      if (searchParams.cropName) params.cropName = searchParams.cropName
      if (searchParams.region !== "All Regions") params.region = searchParams.region

      const response = await api.get("/auctions", { params })
      return response.data
    },
  })

  const handleSearch = (data) => {
    setSearchParams(data)
    refetch()
  }

  // Filter active auctions
  const activeAuctions = auctions?.filter((auction) => new Date(auction.deadline) > new Date()) || []

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Browse Auctions</h1>

      <SearchForm onSearch={handleSearch} isSearching={isLoading} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : activeAuctions.length === 0 ? (
        <div className="card text-center py-8">
          <h3 className="text-lg font-medium text-gray-500 mb-2">No active auctions found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or check back later for new auctions.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Auctions</h2>
            <p className="text-gray-500">{activeAuctions.length} auctions found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default BuyerDashboard
