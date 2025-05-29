import React, { useState } from 'react';
import './Home.css';
import verteilLogo from '/verteilimg.svg';
import profileLogo from '/profile.jpg';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="header">
        <div className="company-section">
          <img src={verteilLogo} alt="Verteil Logo" className="company-icon" />
        </div>

        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home   </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About  </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services   </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact   </a>
        </nav>

        <div className="profile-menu">
          <img src={profileLogo} alt="Profile Icon" className="profile-logo" />
          
        </div>
      </header>

      <main className="main-content">
        <h2>Welcome to Verteil Home Page!</h2>
        
        {/* Company News Section */}
        <section className="company-news-box">
          <h3>Company News</h3>
          <ul>
            <li>🌟 New product launch coming soon!</li>
            <li>📈 Quarterly earnings report released.</li>
            <li>💼 Verteil at Tech Conference 2025.</li>
          </ul>
        </section>
        </main>

     
    </div>
  );
}

export default Home;
