import React from "react";
import "./Header.css";
import verteilLogo from "/verteilimg.svg";
import profileLogo from "/profile.jpg";

function Header() {
  return (
    <header className="header">
      <div className="left-section"></div>

      <div className="center-section">
        <img src={verteilLogo} alt="Verteil Logo" className="company-icon" />
      </div>

      <div className="right-section">
        <img src={profileLogo} alt="Profile Icon" className="profile-logo" />
      </div>
    </header>
  );
}

export default Header;
