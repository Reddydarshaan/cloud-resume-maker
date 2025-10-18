import React, { useState } from "react";
import { signOut } from "aws-amplify/auth";
import ResumeForm from "./ResumeForm";
import TemplateSelector from "./TemplateSelector";
import Preview from "./Preview";
import "./Dashboard.css";

function Dashboard({ resumes = [] }) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [resumeData, setResumeData] = useState({});

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login";
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">ResumeMaker Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Step 1: Template Selection */}
      {!selectedTemplate && (
        <div className="template-section">
          <TemplateSelector onSelect={(template) => setSelectedTemplate(template)} />
        </div>
      )}

      {/* Step 2 + 3: Resume Form + Preview below */}
      {selectedTemplate && (
        <div className="form-preview-container-vertical">
          <ResumeForm
            onChange={(data) => setResumeData(data)}
            onSubmit={(data) => alert("Resume submitted!")}
          />
          <Preview data={resumeData} template={selectedTemplate} />
        </div>
      )}

      {/* Step 4: Existing resumes */}
      <div className="dashboard-resumes mt-6">
        <h3 className="resumes-title">Existing Resumes</h3>
        <div className="dashboard-grid">
          {resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <div key={index} className="resume-card">
                <h3 className="resume-name">{resume.name}</h3>
                <p className="resume-email">{resume.email}</p>
                <button
                  className="download-btn"
                  onClick={() => window.open(resume.pdfUrl, "_blank")}
                >
                  Download
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No resumes yet. Create your first one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
