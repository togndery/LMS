"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const [email, setEmail] = useState("dan@gmail.com");
  const [password, setPassword] = useState("1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Login error:", err);

      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>

      <div className="login-container">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">L</div>

          <span className="brand-name">LMS</span>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <div className="header">
            <h1>Welcome back</h1>

            <p>Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <div className="password-header">
                <label htmlFor="password">Password</label>

                <Link href="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <div className="error-message">{error}</div>}

            {/* Submit */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <span className="loader"></span>
              ) : (
                <>
                  Sign in
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Register */}
          <div className="register-link">
            <span>Don't have an account?</span>

            <Link href="/register">Create account</Link>
          </div>
        </div>

        <div className="footer">© 2026 LMS. All rights reserved.</div>
      </div>
    </main>
  );
}
