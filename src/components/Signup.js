import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });
      alert("Signup successful! A verification code has been sent to your email.");
      setShowVerification(true);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      alert("✅ Email verified successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form
        onSubmit={showVerification ? handleConfirm : handleSignup}
        className="signup-form"
      >
        <h2>{showVerification ? "Verify Email" : "Signup"}</h2>

        {!showVerification && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
          </>
        )}

        {showVerification && (
          <>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : showVerification
            ? "Verify Email"
            : "Create Account"}
        </button>

        {!showVerification && (
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Signup;
