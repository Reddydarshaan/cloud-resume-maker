import React, { useState } from "react";
import "./Preview.css";

function Preview({ data, template }) {
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {
    setLoading(true);
    try {
      // Build payload — include all required fields
      const payload = {
        email: data.email,
        name: data.name,
        address: data.address,
        phone: data.phone,
        website: data.website,
        summary: data.summary,
        experience: data.experience,
        education: data.education,
        skills: data.skills,
        languages: data.languages,
        certifications: data.certifications,
        awards: data.awards,
        template: template || null,
      };

      // Send POST request to your Lambda API endpoint
      const res = await fetch(
        "https://vk1m6exzmi.execute-api.ap-south-1.amazonaws.com/default/GenerateResumePDF",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // Parse response safely
      const resText = await res.text();
      let json;
      try {
        json = resText ? JSON.parse(resText) : {};
      } catch (err) {
        console.error("Invalid JSON from server:", resText);
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        const message = json?.error || json?.message || `HTTP ${res.status}`;
        throw new Error(message);
      }

      // ✅ Support multiple possible key names
      const pdfUrl = json?.fileUrl || json?.pdfUrl || json?.url;
      if (!pdfUrl) {
        console.error("No PDF URL returned from Lambda:", json);
        throw new Error("No URL returned from server");
      }

      // ✅ Auto-download and open in new tab
      const fileNameSafe = (data.name || "My_Resume").replace(/\s+/g, "_");
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `${fileNameSafe}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Open PDF in a new tab as fallback
      window.open(pdfUrl, "_blank");

      alert("✅ PDF generated successfully! Download should start automatically.");
    } catch (err) {
      console.error("Generate PDF error:", err);
      alert("❌ Error generating PDF. Check CloudWatch logs and console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-preview-container">
      {/* Resume content preview */}
      <div className="resume-header">
        <h1>{data.name || "Your Name"}</h1>
        <p>{data.address}</p>
        <p>
          {data.phone} • {data.email} • {data.website}
        </p>
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
        <p>
          <strong>Technical Skills:</strong> {data.skills}
        </p>
        <p>
          <strong>Languages:</strong> {data.languages}
        </p>
        <p>
          <strong>Certifications:</strong> {data.certifications}
        </p>
        <p>
          <strong>Awards:</strong> {data.awards}
        </p>
      </section>

      <div
        className="generate-pdf-btn-container"
        style={{ textAlign: "center", marginTop: 24 }}
      >
        <button
          className="generate-pdf-btn"
          onClick={handleGeneratePDF}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate PDF"}
        </button>
      </div>
    </div>
  );
}

export default Preview;
