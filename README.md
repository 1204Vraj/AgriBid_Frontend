# 🌾 AgriBid – Frontend

Welcome to the frontend repository of the **AgriBid**, a real-time web application designed to connect **farmers** and **buyers** through a seamless crop auctioning system. This system ensures transparency, efficiency, and fairness in agricultural transactions.

> 🔗 **Backend Repository**: [AgriBid Backend](https://github.com/1204Vraj/AgriBid_Backend)

---

## 🛠️ Tech Stack

- ⚛️ **React** – UI development
- 🎨 **Tailwind CSS** – Styling
- 🧩 **Zod + React Hook Form** – Form validation
- 🌐 **Axios** – HTTP communication
- 🧠 **TanStack Query (React Query)** – State & data fetching
- 🔐 **JWT Token** – Authentication & role management
- ⚙️ **Vite** – Development build tool

---

## ✨ Features

### 🔐 Role-Based Authentication
- Secure login for **Farmers** and **Buyers**
- JWT-based token system
- Auth state persisted in `localStorage`

### 🧑‍🌾 Farmer Features
- Post new crop auctions with images, description, price & deadline
- View list of current auctions and bidders
- Real-time updates on bidding activity

### 🛒 Buyer Features
- Browse available auctions in real-time
- Place competitive bids instantly
- Track bidding history and highest bid per auction

### 🕒 Real-Time Auction System
- Live bid updates using WebSockets or polling
- Automatic auction expiration and highest bidder selection
- Notification of auction status updates (upcoming, live, closed)

### 🎯 Additional Features
- Smart dashboard redirection after login (`/app/farmer` or `/app/buyer`)
- Form input validation using **Zod**
- Protected routes for authenticated users
- File uploads for auction images (via FormData)
- Error handling and user feedback (toasts/alerts)

---

## 🚀 Getting Started

```bash
git clone https://github.com/1204Vraj/AgriBid_Frontend.git
cd AgriBid_Frontend
npm install
npm run dev
