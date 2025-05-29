import { Link } from "react-router-dom"
import Button from "../components/ui/Button"

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-800 to-green-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <img src="/hero-background.png" alt="Farm field" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">The Marketplace for Farm Fresh Crops</h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Connect directly with buyers and sellers. Get the best prices for your crops or find quality produce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Start Selling
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-green-700"
                >
                  Start Buying
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Crop Auction?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                Our auction system ensures farmers get the best market price for their crops while buyers find
                competitive deals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Our platform ensures safe and transparent transactions between farmers and buyers with real-time
                updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
              <p className="text-gray-600">
                Cut out the middlemen and connect directly with buyers and sellers from across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our platform makes it easy for farmers to sell their crops and for buyers to find quality produce.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Farmers */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                For Farmers
              </h3>

              <ol className="space-y-6">
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Create an Account</h4>
                    <p className="text-gray-600">Sign up as a farmer and set up your profile with your farm details.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">List Your Crops</h4>
                    <p className="text-gray-600">Upload photos, add details about your crops, and set a base price.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Receive Bids</h4>
                    <p className="text-gray-600">Watch as buyers place bids on your crops in real-time.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Complete the Sale</h4>
                    <p className="text-gray-600">Accept the highest bid and arrange for delivery or pickup.</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* For Buyers */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                For Buyers
              </h3>

              <ol className="space-y-6">
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Create an Account</h4>
                    <p className="text-gray-600">
                      Sign up as a buyer and set up your profile with your business details.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Browse Auctions</h4>
                    <p className="text-gray-600">Search for crops by name, variety, location, and other criteria.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Place Bids</h4>
                    <p className="text-gray-600">Bid on crops you're interested in and receive real-time updates.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="font-bold text-green-700">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Win and Purchase</h4>
                    <p className="text-gray-600">
                      If you win the auction, arrange payment and delivery with the farmer.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-green-200">Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3,200+</div>
              <div className="text-green-200">Buyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12,000+</div>
              <div className="text-green-200">Auctions Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$8.5M+</div>
              <div className="text-green-200">Value Traded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
                <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="pt-8 text-center">
                <p className="text-gray-600 mb-4">
                  "As a small farmer, I struggled to find buyers for my organic vegetables. Crop Auction connected me
                  with buyers willing to pay premium prices for my produce."
                </p>
                <p className="font-semibold">John D.</p>
                <p className="text-sm text-gray-500">Organic Farmer, California</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
                <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="pt-8 text-center">
                <p className="text-gray-600 mb-4">
                  "The real-time bidding system is fantastic! I can see bids coming in as they happen and make informed
                  decisions about my purchases."
                </p>
                <p className="font-semibold">Sarah M.</p>
                <p className="text-sm text-gray-500">Restaurant Owner, New York</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
                <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="pt-8 text-center">
                <p className="text-gray-600 mb-4">
                  "I've been able to expand my farm's reach beyond local markets. Now I sell to buyers across the
                  country at better prices than I could get locally."
                </p>
                <p className="font-semibold">Michael T.</p>
                <p className="text-sm text-gray-500">Grain Farmer, Iowa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers already using Crop Auction to revolutionize agricultural commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="primary" size="lg">
                Create an Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
