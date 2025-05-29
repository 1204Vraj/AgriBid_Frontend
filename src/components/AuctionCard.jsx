import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Button from "./ui/Button"

const AuctionCard = ({ auction }) => {
  const isActive = new Date(auction.deadline) > new Date()
  const timeRemaining = getTimeRemaining(auction.deadline)

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={auction.photos[0] || "/placeholder-crop.jpg"}
          alt={auction.cropName}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {auction.photos.length > 1 && (
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
            +{auction.photos.length - 1} photos
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{auction.cropName}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isActive ? "Active" : "Closed"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-1">Variety: {auction.variety}</p>
        <p className="text-sm text-gray-600 mb-1">Weight: {auction.weight} kg</p>
        <p className="text-sm text-gray-600 mb-1">Location: {auction.location}</p>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs text-gray-500">Current Bid</p>
            <p className="text-lg font-bold">
              {auction.currentBid ? `$${auction.currentBid.toFixed(2)}` : `$${auction.basePrice.toFixed(2)}`}
            </p>
          </div>

          {isActive && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Ends in</p>
              <p className="text-sm font-medium text-orange-600">{timeRemaining}</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link to={`/app/auctions/${auction.id}`}>
            <Button variant="primary" className="w-full" disabled={!isActive}>
              {isActive ? "View Auction" : "Auction Closed"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Helper function to format time remaining
function getTimeRemaining(deadline) {
  const now = new Date()
  const endTime = new Date(deadline)
  const diff = endTime - now

  if (diff <= 0) {
    return "Ended"
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}d ${hours}h`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

AuctionCard.propTypes = {
  auction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cropName: PropTypes.string.isRequired,
    variety: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired,
    currentBid: PropTypes.number,
    deadline: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default AuctionCard
