import React from "react";
import "./style.css";

const Label = ({ htmlFor, text, className }) => {
  return (
    <label htmlFor={htmlFor} className="form-group label">
      {text}
    </label>
  );
};

export default Label;