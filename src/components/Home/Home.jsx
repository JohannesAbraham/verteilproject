import React, { useState, useEffect } from 'react';
import './Home.css';
import verteilLogo from '/verteilimg.svg';
import profileLogo from '/profile.jpg';
import Footer from "/src/components/Footer/Footer"

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

  const airlineNewsItems = [
    {
      id: 1,
      image: 'https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw=',
      heading: '✈️ New Commercial Jet Over the Clouds!',
      date: 'May 30, 2025'
    },
    {
      id: 2,
      image: 'https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw=',
      heading: '🛫 Airline Industry Sees Recovery',
      date: 'May 29, 2025'
    },
    {
      id: 3,
      image: 'https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw=.',
      heading: '📰 Airline Tech Innovations',
      date: 'May 28, 2025'
    }
  ];

  const [newsOrder, setNewsOrder] = useState(newsItems);
  const [airlineNewsOrder, setAirlineNewsOrder] = useState(airlineNewsItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsOrder(prev => {
        const newOrder = [...prev];
        newOrder.push(newOrder.shift());
        return newOrder;
      });
      setAirlineNewsOrder(prev => {
        const newOrder = [...prev];
        newOrder.push(newOrder.shift());
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

         
        <div className="profile-menu">
          <img src={profileLogo} alt="Profile Icon" className="profile-logo" />
        </div>
      </header>

      <main className="main-content">
        
        <div className="news-sections">
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

         <section className="airline-news-box">
  <h3>Airline News</h3>
  <div className="news-layout">
    <div className="news-item large">
      <img
        src="https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw="
        alt="Airline News"
      />
      <div className="news-text">
        <h4>✈️ New International Routes Announced</h4>
        <p className="news-date">May 29, 2025</p>
      </div>
    </div>
    <div className="news-right">
      <div className="news-item medium">
        <img
          src="https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw="
          alt="Airline News"
        />
        <div className="news-text">
          <h4>🛫 Safety Protocol Updates for Summer</h4>
          <p className="news-date">May 28, 2025</p>
        </div>
      </div>
      <div className="news-item small">
        <img
          src="https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw="
          alt="Airline News"
        />
        <div className="news-text">
          <h4>💺 New In-Flight Entertainment Systems</h4>
          <p className="news-date">May 27, 2025</p>
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
      </main>
     <Footer /> 
    </div>
    
  );
}

export default Home;
