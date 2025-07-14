import React from "react";
import "./style.css";

const Button = ({ text, onClickListener }) => {
  return (
    <button className={"login-btn"} onClick={onClickListener}>
      {text}
    </button>
  );
};

export default Button;
