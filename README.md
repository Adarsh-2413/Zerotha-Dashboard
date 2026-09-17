# Zerotha — Full-Stack Stock Trading Platform

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white&style=flat-square)
![Passport.js](https://img.shields.io/badge/Auth-Passport.js-34E27A?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A full-stack trading dashboard inspired by [Zerodha](https://zerodha.com) — India's largest stock broker. Built from scratch with a real backend, session-based authentication, and a fully protected trading interface. This project simulates the core flows of a production trading app — from user registration all the way to placing a buy order that persists in a database.

> Built as a portfolio project to demonstrate full-stack development across multiple React apps, a Node.js REST API, and MongoDB — all wired together with shared session cookies.

---

## Live Architecture

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   Frontend          │     │   Dashboard          │     │   Backend (API)     │
│   localhost:3000    │◄───►│   localhost:3001     │◄───►│   localhost:3002    │
│                     │     │                      │     │                     │
│  Landing pages      │     │  Trading interface   │     │  Express REST API   │
│  Login / Signup     │     │  Holdings, Orders    │     │  MongoDB + Passport │
│  Marketing site     │     │  Charts, Watchlist   │     │  Session auth       │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

---

## Key Features

### Authentication & Security
- **Session-based auth** using Passport.js + `passport-local-mongoose` — no JWT needed, sessions handled server-side with `express-session`
- **Password hashing** handled automatically by `passport-local-mongoose` (PBKDF2 with salt)
- **Route protection** — all data endpoints (`/api/allHoldings`, `/api/allPositions`, `/api/allOrders`, `/api/newOrder`) require an active session via `isLoggedIn` middleware
- **Cross-origin session sharing** — Both React apps (ports 3000 & 3001) share the same session cookie using CORS `credentials: true`

### Dashboard
- **Auth guard on load** — Dashboard calls `GET /api/me` before rendering. Unauthenticated users are silently redirected to the login page
- **Holdings** — Live portfolio data fetched from MongoDB, displaying stock name, quantity, average price, current price, and P&L
- **Positions** — Intraday positions with product type (CNC/MIS) and day change
- **Orders** — Real-time order history pulled from the database, color-coded by BUY (green) / SELL (red)
- **Watchlist + Buy Window** — Floating buy order popup that submits to the backend and persists the order
- **Charts** — Portfolio breakdown via Doughnut chart and performance via vertical bar chart (Chart.js)
- **Profile menu** — Username displayed with avatar initials. Click to toggle a dropdown with logout

### Frontend (Marketing Site)
- Multi-page React app with routes for Home, About, Products, Pricing, Support, Login, and Signup
- Shared Navbar and Footer across all pages
- Login success triggers a session check and redirects to the Dashboard

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, React Router v7, Axios |
| Dashboard | React 19, React Router v7, MUI v9, Chart.js 4, Axios |
| Backend | Node.js, Express 5 |
| Authentication | Passport.js, passport-local-mongoose, express-session |
| Database | MongoDB Atlas (Mongoose ODM) |
| API Client | Axios (shared instance with `withCredentials: true` for cookie forwarding) |

---

## Project Structure

```
Zerotha/
│
├── backend/
│   ├── index.js                  # Express server — all routes, middleware, DB seed
│   ├── model/
│   │   ├── UserModel.js          # User schema + passport-local-mongoose plugin
│   │   ├── HoldingsModel.js
│   │   ├── OrdersModel.js
│   │   └── PositionsModel.js
│   └── schemas/
│       ├── HoldingsSchema.js
│       ├── OrdersSchema.js
│       └── PositionsSchema.js
│
├── frontend/                     # Public-facing marketing + auth site (port 3000)
│   └── src/
│       ├── index.js              # BrowserRouter with all page routes
│       └── landing/
│           ├── Navbar.js / Footer.js
│           ├── home/             # Homepage sections
│           ├── signup/           # Login.js + SignUP.js
│           ├── about/
│           ├── pricing/
│           ├── products/
│           └── support/
│
└── Dashboard/                    # Protected trading dashboard (port 3001)
    └── src/
        ├── index.js              # Calls /api/me before rendering — redirects if unauthed
        ├── components/
        │   ├── Menu.js           # Sidebar navigation + user profile + logout
        │   ├── Dashboard.js      # Main layout with sidebar + content area
        │   ├── WatchList.js      # Stock watchlist with buy trigger
        │   ├── BuyActionWindow.js# Floating order form — posts to /api/newOrder
        │   ├── Holdings.js       # Portfolio holdings table
        │   ├── Positions.js      # Open positions table
        │   ├── Orders.js         # Live order history from DB
        │   ├── Funds.js          # Account funds overview
        │   ├── Summary.js        # P&L summary
        │   ├── DoughnoutChart.js # Portfolio allocation chart
        │   └── VerticalGraph.js  # Performance bar chart
        └── utils/
            └── api.js            # Shared Axios instance — baseURL + withCredentials
```

---

## Authentication Flow

```
User visits Dashboard (localhost:3001)
          │
          ▼
  GET /api/me  ──► 401 Unauthorized
          │                │
          │                ▼
          │     Redirect → localhost:3000/login
          │                │
          │         User logs in
          │         POST /api/login
          │                │
          │         Passport authenticates
          │         Session cookie set
          │                │
          │         Redirect → localhost:3001
          │
         200 OK
          │
          ▼
   Dashboard renders
   (Holdings, Orders, Positions, etc. all fetch with same cookie)
```

---

## Getting Started

**Prerequisites:** Node.js 18+, npm, a MongoDB Atlas account (free tier works fine)

### 1. Clone the repository

```bash
git clone https://github.com/Adarsh-2413/Zerotha-Dashboard.git
cd Zerotha-Dashboard
```

### 2. Configure and start the backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URL=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/zerotha
SESSION_SECRET=any_long_random_string_here
```

```bash
npm start
# ✅ DB connected
# ✅ Backend running on http://localhost:3002
```

> On first run, it auto-seeds 12 holdings and 2 positions into MongoDB.

### 3. Start the frontend (marketing site + auth)

```bash
cd ../frontend
npm install
npm start
# http://localhost:3000
```

### 4. Start the dashboard

```bash
cd ../Dashboard
npm install
npm start
# http://localhost:3001
```

Open `http://localhost:3000` → Sign up → Log in → You'll land on the dashboard.

---

## API Reference

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/register` | ❌ | Create a new user account |
| POST | `/api/login` | ❌ | Authenticate and start a session |
| GET | `/api/logout` | ❌ | End the session |
| GET | `/api/me` | ✅ | Get the logged-in user's info |
| GET | `/api/allHoldings` | ✅ | Fetch portfolio holdings |
| GET | `/api/allPositions` | ✅ | Fetch open positions |
| GET | `/api/allOrders` | ✅ | Fetch order history |
| POST | `/api/newOrder` | ✅ | Place a new buy/sell order |

---

## What I Learned Building This

- How to share sessions across multiple origins using `cors` with `credentials: true` and `withCredentials` on Axios
- Why `passport-local-mongoose` v9 needs `.default` when imported with CommonJS `require()`
- How to structure a monorepo with separate frontends talking to one backend
- The difference between JWT and session-based auth in practice — and why sessions work better when you control all your own origins
- How to use React Router v7's `<Routes>` and `<Route>` properly across two separate apps

---

---

## Deployment Guide

Deploying this 3-tier architecture (Frontend, Dashboard, Backend) is completely free using **Vercel** (for Frontend & Dashboard) and **Render** (for Backend API):

### Step 1: Deploy Backend on Render
1. Go to [render.com](https://dashboard.render.com) and create a **New Web Service**.
2. Connect your GitHub repository: `https://github.com/Adarsh-2413/Zerotha-Dashboard`.
3. Configure the settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node index.js`)
4. Add the following **Environment Variables**:
   - `MONGO_URL`: *Your MongoDB connection string from MongoDB Atlas*
   - `SESSION_SECRET`: *A secure random string (e.g. `zerothaprodsecret9988`)*
   - `NODE_ENV`: `production`
5. Click **Deploy Web Service** and copy your backend URL (e.g., `https://zerotha-backend.onrender.com`).

---

### Step 2: Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com/new) and import `Zerotha-Dashboard`.
2. Configure project settings:
   - **Project Name**: `zerotha-frontend`
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Click Edit and select `frontend`
3. Add **Environment Variables**:
   - `REACT_APP_API_URL`: `https://your-backend-service.onrender.com`
   - `REACT_APP_DASHBOARD_URL`: `https://your-dashboard-service.vercel.app` *(update once dashboard is deployed)*
4. Click **Deploy**.

---

### Step 3: Deploy Dashboard on Vercel
1. Go to [vercel.com/new](https://vercel.com/new) and import `Zerotha-Dashboard` again as a separate project.
2. Configure project settings:
   - **Project Name**: `zerotha-dashboard`
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Click Edit and select `Dashboard`
3. Add **Environment Variables**:
   - `REACT_APP_API_URL`: `https://your-backend-service.onrender.com`
   - `REACT_APP_FRONTEND_URL`: `https://your-frontend-service.vercel.app`
4. Click **Deploy**.

---

### Step 4: Link Frontend & Dashboard URLs back to Backend
In your **Render Backend Dashboard**:
1. Go to **Environment**.
2. Add/Update:
   - `FRONTEND_URL`: `https://your-frontend-service.vercel.app`
   - `DASHBOARD_URL`: `https://your-dashboard-service.vercel.app`
3. Save changes — Render will automatically redeploy and sync CORS & cookie rules!

---

## Author

**Adarsh Shukla** — [github.com/Adarsh-2413](https://github.com/Adarsh-2413)

---