import React, { useState, useEffect } from "react";
import "./TemplateSelector.css";

function TemplateSelector({ onSelect }) {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setTemplates([
      "https://resumes-templates.s3.ap-south-1.amazonaws.com/resumetemplate1.png",
    ]);
  }, []);

  const handleSelect = (template) => {
    setSelected(template);
    onSelect(template);
  };

  return (
    <div className="template-selector">
      <h2 className="template-title">Select a Template</h2>
      <div className="template-grid">
        {templates.map((template, index) => (
          <div
            key={index}
            className={`template-card ${
              selected === template ? "selected" : ""
            }`}
            onClick={() => handleSelect(template)}
          >
            <img
              src={template}
              alt={`Template ${index + 1}`}
              className="template-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
