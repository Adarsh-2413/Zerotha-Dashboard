import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    api
      .get("/api/me")
      .then((res) => setUsername(res.data.username || "User"))
      .catch(() => setUsername("User"));
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await api.get("/api/logout");
      const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
      window.location.href = FRONTEND_URL;
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Generate avatar initials from username
  const getInitials = (name) => {
    if (!name) return "ZU";
    return name.slice(0, 2).toUpperCase();
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="Zerotha logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", position: "relative" }}>
          <div className="avatar">{getInitials(username)}</div>
          <p className="username">{username || "Loading..."}</p>
        </div>

        {/* Profile dropdown */}
        {isProfileDropdownOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "20px",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "8px 0",
              minWidth: "160px",
              zIndex: 100,
            }}
          >
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid #f0f0f0",
                fontWeight: "600",
                fontSize: "0.85rem",
                color: "#333",
              }}
            >
              {username}
            </div>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "10px 16px",
                textAlign: "left",
                cursor: "pointer",
                color: "#d32f2f",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;