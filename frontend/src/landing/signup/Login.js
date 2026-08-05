import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3002/api/login",
        { username: formData.username, password: formData.password },
        { withCredentials: true } // send/receive session cookie
      );

      setMessage(`Welcome back, ${response.data.username}!`);

      // Trigger Navbar to re-check /api/me — navigate to home after short delay
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // refresh so Navbar picks up the new session
      }, 800);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "4rem 2rem", maxWidth: "480px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Welcome back
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        Log in to access your Zerotha dashboard.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.9rem",
            borderRadius: "6px",
            border: "none",
            background: "#387ed1",
            color: "#fff",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      {error && (
        <p style={{ color: "crimson", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </p>
      )}
      {message && (
        <p style={{ color: "green", marginTop: "1rem", textAlign: "center" }}>
          {message}
        </p>
      )}

      <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#666" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#387ed1" }}>
          Sign up
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
