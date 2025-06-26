import "./Header.css";
import verteilLogo from "/verteilimg.svg";

function Header() {
  return (
    <header className="header">
      <div className="left-section"></div>

      <div className="center-section">
        <img src={verteilLogo} alt="Verteil Logo" className="company-icon" />
      </div>
    </header>
  );
}

export default Header;
