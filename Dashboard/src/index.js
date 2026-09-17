import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import api from "./utils/api";

// Auth Guard: Check session before rendering the Dashboard.
// If not authenticated, redirect to the Frontend login page.
const renderApp = async () => {
  try {
    await api.get("/api/me"); // throws 401 if not logged in
    // Session valid — render Dashboard
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (err) {
    // Not authenticated — redirect to Frontend login
    const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
    window.location.href = `${FRONTEND_URL}/login`;
  }
};

renderApp();