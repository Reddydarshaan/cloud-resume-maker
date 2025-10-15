import React from "react";
import "./Preview.css";

function Preview({ data, template }) {
  return (
    <div className="resume-preview-container">
      <div className="resume-header">
        <h1>{data.name || "Your Name"}</h1>
        <p>{data.address}</p>
        <p>{data.phone} • {data.email} • {data.website}</p>
      </div>

      <section>
        <h2>SUMMARY</h2>
        <p>{data.summary}</p>
      </section>

      <section>
        <h2>WORK EXPERIENCE</h2>
        <p>{data.experience}</p>
      </section>

      <section>
        <h2>EDUCATION</h2>
        <p>{data.education}</p>
      </section>

      <section>
        <h2>ADDITIONAL INFORMATION</h2>
        <p><strong>Technical Skills:</strong> {data.skills}</p>
        <p><strong>Languages:</strong> {data.languages}</p>
        <p><strong>Certifications:</strong> {data.certifications}</p>
        <p><strong>Awards:</strong> {data.awards}</p>
      </section>
    </div>
  );
}

export default Preview;
