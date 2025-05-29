# Crop Auction Platform

A React 18 front-end application for a "Crop Auction" platform where farmers can list their crops for auction and buyers can bid on them.

## Features

- **Role-based dashboards** (Farmer and Buyer)
- **Farmer features**:
  - View and manage auctions
  - Create new auctions with photo uploads
  - Set crop details, base price, and bidding deadline
- **Buyer features**:
  - Search auctions by crop name and region
  - View auction details and place bids
  - Real-time bid updates via Socket.IO
- **Protected routes** based on user role
- **Responsive design** for all screen sizes

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM v6
- React Query for data fetching
- Redux Toolkit for auth/role state
- React Hook Form + Zod for form validation
- Axios for API calls
- Socket.IO client for real-time updates

## Project Structure

\`\`\`
src/
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── store/              # Redux store and slices
├── utils/              # Utility functions
├── App.jsx             # Main app component with routes
└── main.jsx            # Entry point
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

## API Endpoints

The front-end expects the following API endpoints:

- **Authentication**:
  - POST `/api/auth/login` - Login with email, password, and role
  - POST `/api/auth/logout` - Logout

- **Auctions**:
  - GET `/api/auctions` - Get all auctions (with optional search params)
  - GET `/api/auctions/farmer` - Get auctions for the logged-in farmer
  - GET `/api/auctions/:id` - Get auction details
  - POST `/api/auctions` - Create a new auction

- **Bids**:
  - GET `/api/auctions/:id/bids` - Get bids for an auction
  - POST `/api/auctions/:id/bids` - Place a bid on an auction

## Socket.IO Events

The application listens for real-time updates on the following channels:

- `auction:<id>` - For real-time bid updates on a specific auction

## Demo Credentials

For testing purposes, you can use the following credentials:

- **Farmer**:
  - Email: farmer@example.com
  - Password: password123

- **Buyer**:
  - Email: buyer@example.com
  - Password: password123
