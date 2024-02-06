// Logo.js
import React from "react";

function Logo() {
  return (
    <div className="logo-container">
      <img
        src={process.env.PUBLIC_URL + "/logo0.png"}
        alt="Logo"
        className="logo-image"
      />
    </div>
  );
}

export default Logo;
