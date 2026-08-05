# Zerotha — A Full-Stack Stock Trading Dashboard

Zerotha is a full-stack web app inspired by Zerodha — India's largest stock broker. Built as a personal learning project, it covers everything from a public-facing marketing site to a protected trading dashboard, all backed by a real REST API with session-based authentication.

---

## What's inside

The project is split into three parts that talk to each other:

```
Zerotha/
├── frontend/     → Public website (landing, login, signup)   → localhost:3000
├── Dashboard/    → Private trading dashboard                 → localhost:3001
└── backend/      → Express API + MongoDB                     → localhost:3002
```

**Frontend** is what a visitor sees first — a landing page, pricing info, product pages, and the login/signup flow. Once you log in, it redirects you to the Dashboard.

**Dashboard** is the actual trading interface. It checks your session on load — if you're not logged in, it bounces you back to the login page automatically. Inside you'll find your holdings, open positions, order history, a watchlist, and charts.

**Backend** handles everything behind the scenes — user registration and login (using Passport.js + sessions), and protected API endpoints for holdings, positions, and orders. Data is stored in MongoDB Atlas.

---

## Features

- **Session-based auth** — Register, log in, log out. Sessions persist for 24 hours. Passwords are hashed automatically via `passport-local-mongoose`.
- **Auth-guarded dashboard** — The Dashboard checks `/api/me` before rendering. Unauthenticated users get redirected to login.
- **Holdings & Positions** — Fetched live from MongoDB. Auto-seeded with sample Indian stocks (INFY, TCS, RELIANCE, etc.) if the DB is empty.
- **Order placement** — Buy orders go through a popup window and get saved to MongoDB via the `/api/newOrder` endpoint.
- **Real order history** — The Orders page fetches and displays actual orders from the database, color-coded by mode (BUY / SELL).
- **Profile menu** — Shows your username with initials as an avatar. Click it to log out.
- **Charts** — Doughnut and vertical bar charts using `chart.js`.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, React Router v7 |
| Dashboard | React 19, MUI, Chart.js |
| Backend | Node.js, Express 5 |
| Auth | Passport.js, passport-local-mongoose, express-session |
| Database | MongoDB (via Mongoose) |
| HTTP | Axios (shared instance with `withCredentials: true`) |

---

## Getting Started

You'll need **Node.js**, **npm**, and a **MongoDB Atlas** connection string (or local MongoDB).

### 1. Clone the repo

```bash
git clone https://github.com/Adarsh-2413/Zerotha-Dashboard.git
cd Zerotha-Dashboard
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=pick_any_long_random_string
```

Start the server:

```bash
npm start
# Running on http://localhost:3002
```

The first time it runs, it'll auto-seed holdings and positions data into your database.

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm start
# Running on http://localhost:3000
```

### 4. Start the dashboard

```bash
cd ../Dashboard
npm install
npm start
# Running on http://localhost:3001
```

That's it — open `http://localhost:3000`, create an account, log in, and you'll land on the dashboard.

---

## How the auth flow works

```
User visits localhost:3001 (Dashboard)
        │
        ▼
  Calls GET /api/me
        │
   ┌────┴────┐
   │         │
  200       401
   │         │
   ▼         ▼
Render   Redirect to
Dashboard  localhost:3000/login
```

After a successful login, the frontend redirects back to `localhost:3001` — the dashboard — and everything loads automatically from there.

---

## Project Structure (abbreviated)

```
backend/
  index.js              # Express app, all routes
  model/
    UserModel.js        # Mongoose user schema + passport plugin
    HoldingsModel.js
    OrdersModel.js
    PositionsModel.js
  schemas/
    ...                 # Mongoose schema definitions

frontend/src/
  index.js              # App entry — sets up all routes
  landing/
    Navbar.js / Footer.js
    home/               # Landing page sections
    signup/             # Login.js + SignUP.js
    about/ pricing/ products/ support/

Dashboard/src/
  index.js              # Auth check before rendering
  components/
    Menu.js             # Sidebar nav + logout
    Dashboard.js        # Main layout
    Holdings.js         # Holdings table
    Positions.js        # Positions table
    Orders.js           # Live orders from DB
    WatchList.js        # Watchlist with buy window
    BuyActionWindow.js  # Buy order popup
    DoughnoutChart.js   # Portfolio chart
  utils/
    api.js              # Shared axios instance
```

---

## Known Limitations

- No real-time price updates — stock prices are static/seeded values for now.
- Holdings and positions are shared across all users (no per-user filtering yet).
- No SELL flow implemented yet — only BUY orders work.

---

## Why I built this

I wanted to understand how a real trading platform works end-to-end — the auth flow, protected routes across multiple apps sharing a session, and how the frontend and backend coordinate. Zerodha was the inspiration since I actually use it, and Zerotha felt like a fitting name for the clone.

---

## License

MIT — do whatever you want with it.
