import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Amplify } from "aws-amplify";

// Import everything first
import outputs from "./aws-exports.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import ResumeForm from "./components/ResumeForm.js";
import TemplateSelector from "./components/TemplateSelector.js";
import Preview from "./components/Preview.js";
import Dashboard from "./components/Dashboard.js";

// ✅ Configure Amplify AFTER all imports
Amplify.configure(outputs);


function App() {
  const [user, setUser] = useState(null);
  const [resumeData, setResumeData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [resumes, setResumes] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Root route redirects */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login onLogin={() => setUser({ name: "User" })} />}
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={<Signup onSignup={() => setUser({ name: "New User" })} />}
        />

        {/* Resume Form */}
        <Route
          path="/form"
          element={
            user ? (
              <ResumeForm
                onSubmit={(data) => {
                  setResumeData(data);
                  window.location.href = "/template";
                }}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Template Selector */}
        <Route
          path="/template"
          element={
            user ? (
              <TemplateSelector
                onSelect={(template) => {
                  setSelectedTemplate(template);
                  window.location.href = "/preview";
                }}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Preview */}
        <Route
          path="/preview"
          element={
            user ? (
              <Preview data={resumeData} template={selectedTemplate} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              resumes={
                resumes.length
                  ? resumes
                  : [
                      {
                        name: "Darshaan",
                        email: "darshaan@example.com",
                        pdfUrl: "https://example.com/resume.pdf",
                      },
                    ]
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
