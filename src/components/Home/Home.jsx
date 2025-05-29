import React, { useState, useEffect } from 'react';
import './Home.css';
import verteilLogo from '/verteilimg.svg';
import profileLogo from '/profile.jpg';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const newsItems = [
    {
      id: 1,
      image: 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg',
      heading: '🌟 New Product Launch Coming Soon!',
      date: 'May 28, 2025'
    },
    {
      id: 2,
      image: 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg',
      heading: '📈 Quarterly Earnings Report Released',
      date: 'May 27, 2025'
    },
    {
      id: 3,
      image: 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg',
      heading: '💼 Verteil at Tech Conference 2025',
      date: 'May 26, 2025'
    }
  ];

  const [newsOrder, setNewsOrder] = useState(newsItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        const firstItem = newOrder.shift();
        newOrder.push(firstItem);
        return newOrder;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header className="header">
        <div className="company-section">
          <img src={verteilLogo} alt="Verteil Logo" className="company-icon" />
        </div>

        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="profile-menu">
          <img src={profileLogo} alt="Profile Icon" className="profile-logo" />
        </div>
      </header>

      <main className="main-content">
        <h2>Welcome to Verteil Home Page!</h2>

        <section className="company-news-box">
          <h3>Company News</h3>
          <div className="news-layout">
            <div className="news-item large">
              <img src={newsOrder[0].image} alt="News" />
              <div className="news-text">
                <h4>{newsOrder[0].heading}</h4>
                <p className="news-date">{newsOrder[0].date}</p>
              </div>
            </div>
            <div className="news-right">
              <div className="news-item medium">
                <img src={newsOrder[1].image} alt="News" />
                <div className="news-text">
                  <h4>{newsOrder[1].heading}</h4>
                  <p className="news-date">{newsOrder[1].date}</p>
                </div>
              </div>
              <div className="news-item small">
                <img src={newsOrder[2].image} alt="News" />
                <div className="news-text">
                  <h4>{newsOrder[2].heading}</h4>
                  <p className="news-date">{newsOrder[2].date}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
