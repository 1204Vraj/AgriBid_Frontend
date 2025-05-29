import PropTypes from "prop-types"

const BidHistory = ({ bids, isLoading }) => {
    if (isLoading) {
        return (
            <div className="card">
                <h3 className="text-lg font-medium mb-4">Bid History</h3>
                <div className="animate-pulse space-y-3">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-10 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (!bids || bids.length === 0) {
        return (
            <div className="card">
                <h3 className="text-lg font-medium mb-4">Bid History</h3>
                <p className="text-gray-500 text-center py-4">No bids placed yet</p>
            </div>
        )
    }

    // Sort bids by timestamp (newest first)
    const sortedBids = [...bids].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    // Format date as dd/mm/yyyy
    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <div className="card">
            <h3 className="text-lg font-medium mb-4">Bid History</h3>
            <div className="space-y-3">
                {sortedBids.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                        <div>
                            <p className="font-medium">₹{bid.amount.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">by {bid.bidderName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">{formatDate(bid.timestamp)}</p>
                            <p className="text-xs text-gray-400">{new Date(bid.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

BidHistory.propTypes = {
    bids: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            bidderName: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired,
        }),
    ),
    isLoading: PropTypes.bool,
}

export default BidHistory
