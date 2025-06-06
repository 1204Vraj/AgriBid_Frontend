import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import AuctionTable from "../components/AuctionTable";
import Button from "../components/ui/Button";

const FarmerDashboard = () => {
  const {
    data: auctions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["farmerAuctions"],
    queryFn: async () => {
      const response = await api.get("/auctions/farmer");
      return response.data.map((a) => ({
        ...a,
        id: a.id?.toString(), // ensure id is string
      }));
    },
  });

  const now = new Date();

  const activeAuctions = auctions?.filter(
      (a) => new Date(a.deadline) > now
  ) || [];

  const completedAuctions = auctions?.filter(
      (a) => new Date(a.deadline) <= now
  ) || [];

  const completedWithWinner = completedAuctions.filter(
      (a) => a.winnerName && a.winnerEmail
  );

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Auctions</h1>
          <Link to="/app/farmer/NewAuction">
            <Button variant="primary">Create New Auction</Button>
          </Link>
        </div>

        {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">
                Error loading auctions. Please try again later.
              </p>
            </div>
        )}

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Your Active Auctions</h2>
          </div>
          <AuctionTable
              auctions={activeAuctions}
              isLoading={isLoading}
              isFarmerView={true}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Auction Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Active Auctions</p>
                <p className="text-2xl font-bold text-green-700">
                  {isLoading ? "..." : activeAuctions.length}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Completed Auctions</p>
                <p className="text-2xl font-bold text-orange-700">
                  {isLoading ? "..." : completedAuctions.length}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Total Bids Received</p>
                <p className="text-2xl font-bold text-blue-700">
                  {isLoading
                      ? "..."
                      : auctions?.reduce(
                      (total, auction) => total + (auction.bidCount || 0),
                      0
                  ) || 0}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Highest Bid</p>
                <p className="text-2xl font-bold text-purple-700">
                  {isLoading
                      ? "..."
                      : auctions?.reduce(
                          (max, auction) =>
                              auction.currentBid > max ? auction.currentBid : max,
                          0
                      ) > 0
                          ? `₹${auctions
                              ?.reduce(
                                  (max, auction) =>
                                      auction.currentBid > max
                                          ? auction.currentBid
                                          : max,
                                  0
                              )
                              .toFixed(2)}`
                          : "No bids"}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-medium mb-4">Quick Tips</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                "Add high-quality photos to increase buyer interest",
                "Set a competitive base price to attract initial bids",
                "Provide detailed crop information for better visibility",
                "Set reasonable deadlines to create urgency",
              ].map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{tip}</span>
                  </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Winner Section */}
        {completedWithWinner.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-medium mb-4">
                Winners of Completed Auctions
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                  <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2">Auction ID</th>
                    <th className="px-4 py-2">Crop</th>
                    <th className="px-4 py-2">Deadline</th>
                    <th className="px-4 py-2">Winner Name</th>
                    <th className="px-4 py-2">Winner Email</th>
                    <th className="px-4 py-2">Winning Bid</th>
                  </tr>
                  </thead>
                  <tbody>
                  {completedWithWinner.map((auction) => (
                      <tr key={auction.id} className="border-b">
                        <td className="px-4 py-2">{auction.id}</td>
                        <td className="px-4 py-2">{auction.cropName}</td>
                        <td className="px-4 py-2">
                          {new Date(auction.deadline).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">{auction.winnerName}</td>
                        <td className="px-4 py-2">{auction.winnerEmail}</td>
                        <td className="px-4 py-2">
                          ₹{auction.currentBid?.toFixed(2) || "0.00"}
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
        )}
      </div>
  );
};

export default FarmerDashboard;
