import React, { useState } from "react";
import "./ResumeForm.css";

function ResumeForm({ onChange, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    languages: "",
    certifications: "",
    awards: "",
  });

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    if (typeof onChange === "function") onChange(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") onSubmit(formData);
  };

  return (
    <div className="resume-form-container">
      <h2 className="form-title">Enter Resume Details</h2>
      <form onSubmit={handleSubmit}>
        <h3>Header</h3>
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} />

        <h3>Summary</h3>
        <textarea name="summary" placeholder="Write a short summary..." value={formData.summary} onChange={handleChange} />

        <h3>Work Experience</h3>
        <textarea name="experience" placeholder="Add work experience..." value={formData.experience} onChange={handleChange} />

        <h3>Education</h3>
        <textarea name="education" placeholder="Add education details..." value={formData.education} onChange={handleChange} />

        <h3>Additional Information</h3>
        <textarea name="skills" placeholder="Technical Skills" value={formData.skills} onChange={handleChange} />
        <textarea name="languages" placeholder="Languages" value={formData.languages} onChange={handleChange} />
        <textarea name="certifications" placeholder="Certifications" value={formData.certifications} onChange={handleChange} />
        <textarea name="awards" placeholder="Awards or Achievements" value={formData.awards} onChange={handleChange} />

        <button type="submit" className="submit-btn">Save Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;
