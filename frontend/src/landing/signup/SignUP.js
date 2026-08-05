import React, { useState } from "react";
import axios from "axios";

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3002/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setMessage(response.data.message || "Account created successfully.");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: "4rem 2rem", maxWidth: "480px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Create your account</h1>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        Join Zerotha and start your investing journey.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.9rem", borderRadius: "6px", border: "none", background: "#387ed1", color: "#fff", cursor: "pointer" }}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      {error ? <p style={{ color: "crimson", marginTop: "1rem" }}>{error}</p> : null}
      {message ? <p style={{ color: "green", marginTop: "1rem" }}>{message}</p> : null}
    </section>
  );
}

export default SignUpPage;
