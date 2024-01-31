// Logo.js
import React from "react";

function Logo() {
  return (
    <div className="logo-container">
      <img
        src={process.env.PUBLIC_URL + "/logo0.png"} // Replace with the actual path to your logo image
        alt="Logo"
        className="logo-image"
      />
    </div>
  );
}

export default Logo;
