import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Button from "./ui/Button"

const AuctionTable = ({ auctions, isLoading, isFarmerView = false }) => {
    if (isLoading) {
        return (
            <div className="card">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-10 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!auctions || auctions.length === 0) {
        return (
            <div className="card text-center py-8">
                <p className="text-gray-500 mb-4">No auctions found</p>
                {isFarmerView && (
                    <Link to="app/farmer/NewAuction">
                        <Button variant="primary">Create New Auction</Button>
                    </Link>
                )}
            </div>
        )
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="table-header-cell">Crop</th>
                    <th className="table-header-cell">Variety</th>
                    <th className="table-header-cell">Weight (kg)</th>
                    <th className="table-header-cell">Location</th>
                    <th className="table-header-cell">Base Price</th>
                    <th className="table-header-cell">Current Bid</th>
                    <th className="table-header-cell">Deadline</th>
                    <th className="table-header-cell">Status</th>
                    <th className="table-header-cell">Action</th>
                </tr>
                </thead>
                <tbody className="table-body">
                {auctions.map((auction) => {
                    const isActive = new Date(auction.deadline) > new Date()
                    const status = isActive ? "Active" : "Closed"

                    return (
                        <tr key={auction.id} className="table-row">
                            <td className="table-cell font-medium">{auction.cropName}</td>
                            <td className="table-cell">{auction.variety}</td>
                            <td className="table-cell">{auction.weight}</td>
                            <td className="table-cell">{auction.location}</td>
                            <td className="table-cell">${auction.basePrice.toFixed(2)}</td>
                            <td className="table-cell">
                                {auction.currentBid ? `$${auction.currentBid.toFixed(2)}` : "No bids yet"}
                            </td>
                            <td className="table-cell">
                                {new Date(auction.deadline).toLocaleDateString("en-GB")}
                            </td>
                            <td className="table-cell">
                  <span
                      className={`px-2 py-1 rounded-full text-xs ${
                          isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                  >
                    {status}
                  </span>
                            </td>
                            <td className="table-cell">
                                {isFarmerView ? (
                                    <Link to={`/app/auctions/${auction.id}`}>
                                        <Button variant="outline" size="sm" disabled={!isActive}>
                                            View Details
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to={`/app/auctions/${auction.id}`}>
                                        <Button variant="primary" size="sm" disabled={!isActive}>
                                            View Auction
                                        </Button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

AuctionTable.propTypes = {
    auctions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            cropName: PropTypes.string.isRequired,
            variety: PropTypes.string.isRequired,
            weight: PropTypes.number.isRequired,
            location: PropTypes.string.isRequired,
            basePrice: PropTypes.number.isRequired,
            currentBid: PropTypes.number,
            deadline: PropTypes.string.isRequired,
        }),
    ),
    isLoading: PropTypes.bool,
    isFarmerView: PropTypes.bool,
}

export default AuctionTable
