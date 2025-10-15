import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting sign-in...");
      const result = await signIn({ username: email, password });
      console.log("Sign-in result:", result);

      const session = await fetchAuthSession();
      console.log("Fetched session:", session);

      if (session?.tokens?.idToken) {
        alert("✅ Login successful!");
        navigate("/dashboard");
      } else {
        setError("Session not established. Please try again.");
      }

      const currentUser = await getCurrentUser();
      console.log("Logged-in user:", currentUser);
    } catch (err) {
      console.error("Login error:", err);
      if (err.name === "UserNotConfirmedException") {
        setError("Email not verified. Please check your inbox.");
      } else if (err.name === "NotAuthorizedException") {
        setError("Incorrect username or password.");
      } else {
        setError(err.message || "Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="direct-dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>

        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
