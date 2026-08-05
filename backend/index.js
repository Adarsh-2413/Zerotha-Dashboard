require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const UserModel = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || "zerothafallbacksecret";

const app = express();

// ─── CORS — allow both Frontend (3000) and Dashboard (3001) with credentials ───
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true, // allow session cookies cross-origin
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Session ────────────────────────────────────────────────────────────────────
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ─── Passport ───────────────────────────────────────────────────────────────────
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// ─── Auth Middleware ─────────────────────────────────────────────────────────────
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: "Unauthorized. Please log in." });
};

// ─── Auth Routes ─────────────────────────────────────────────────────────────────

// GET /api/me — Returns logged-in user info (used by Frontend Navbar and Dashboard)
app.get("/api/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ username: req.user.username, email: req.user.email });
  }
  return res.status(401).json({ error: "Not logged in" });
});

// POST /api/register
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email and password are required" });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // passport-local-mongoose .register() handles password hashing
    const newUser = new UserModel({ username, email });
    await UserModel.register(newUser, password);

    res.json({ message: "Account created successfully! You can now log in." });
  } catch (err) {
    console.error("Registration error:", err);
    if (err.name === "UserExistsError") {
      return res.status(400).json({ error: "Username already taken" });
    }
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

// POST /api/login
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ error: info?.message || "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: "Login successful",
        username: user.username,
        email: user.email,
      });
    });
  })(req, res, next);
});

// GET /api/logout
app.get("/api/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });
});

// ─── Protected Data Routes ───────────────────────────────────────────────────────

// GET /api/allHoldings
app.get("/api/allHoldings", isLoggedIn, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// GET /api/allPositions
app.get("/api/allPositions", isLoggedIn, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// GET /api/allOrders
app.get("/api/allOrders", isLoggedIn, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /api/newOrder
app.post("/api/newOrder", isLoggedIn, async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: Number(req.body.qty),
      price: Number(req.body.price),
      mode: req.body.mode,
    });
    await newOrder.save();
    res.json({ message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ─── DB Seeder ───────────────────────────────────────────────────────────────────
const seedDatabase = async () => {
  const holdingsCount = await HoldingsModel.countDocuments();
  if (holdingsCount === 0) {
    console.log("Seeding holdings...");
    await HoldingsModel.insertMany([
      { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
      { name: "HDFCBANK",   qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
      { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
      { name: "INFY",       qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
      { name: "ITC",        qty: 5, avg: 202.0,  price: 207.9,  net: "+2.92%", day: "+0.80%" },
      { name: "KPITTECH",   qty: 5, avg: 250.3,  price: 266.45, net: "+6.45%", day: "+3.54%" },
      { name: "M&M",        qty: 2, avg: 809.9,  price: 779.8,  net: "-3.72%", day: "-0.01%", isLoss: true },
      { name: "RELIANCE",   qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
      { name: "SBIN",       qty: 4, avg: 324.35, price: 430.2,  net: "+32.63%", day: "-0.34%", isLoss: true },
      { name: "TATAPOWER",  qty: 5, avg: 104.2,  price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
      { name: "TCS",        qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
      { name: "WIPRO",      qty: 4, avg: 489.3,  price: 577.75, net: "+18.08%", day: "+0.32%" },
    ]);
    console.log("Holdings seeded.");
  }

  const positionsCount = await PositionsModel.countDocuments();
  if (positionsCount === 0) {
    console.log("Seeding positions...");
    await PositionsModel.insertMany([
      { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
      { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
    ]);
    console.log("Positions seeded.");
  }
};

// ─── Start Server ────────────────────────────────────────────────────────────────
const start = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ DB connected");
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`✅ Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

start();