import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [user, setUser] = useState(null); // null = not checked yet
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Check if user has an active session
    axios
      .get('http://localhost:3002/api/me', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setChecked(true));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3002/api/logout', { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleOpenDashboard = () => {
    window.open('http://localhost:3001', '_blank');
  };

  // Generate initials from username
  const getInitials = (username) => {
    if (!username) return 'U';
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: '#FFF' }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="images/logo.svg"
            style={{ width: '25%' }}
            alt="Zerodha logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav mb-lg-0" style={{ alignItems: 'center' }}>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/support">
                  Support
                </Link>
              </li>

              {/* Auth Section — only rendered after session check */}
              {checked && (
                <>
                  {user ? (
                    // Logged in — show username button → opens Dashboard
                    <li className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
                      <button
                        onClick={handleOpenDashboard}
                        title="Open Dashboard"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#387ed1',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '20px',
                          padding: '6px 14px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.875rem',
                        }}
                      >
                        <span
                          style={{
                            background: '#fff',
                            color: '#387ed1',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.7rem',
                          }}
                        >
                          {getInitials(user.username)}
                        </span>
                        {user.username}
                      </button>
                      <button
                        onClick={handleLogout}
                        title="Logout"
                        style={{
                          background: 'transparent',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          padding: '5px 10px',
                          cursor: 'pointer',
                          color: '#666',
                          fontSize: '0.8rem',
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    // Not logged in — show Signup + Login links
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/signup">
                          Signup
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/login"
                          style={{
                            background: '#387ed1',
                            color: '#fff',
                            padding: '6px 16px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            marginLeft: '8px',
                            fontSize: '0.9rem',
                          }}
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;