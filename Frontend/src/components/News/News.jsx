import React, { useState, useEffect } from 'react';
import './News.css';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

// Wrapper component for section titles
const NewsSection = ({ title, innerClassName, children }) => (
  <div>
    <h2 className="section-title">{title}</h2>
    <div className={innerClassName}>{children}</div>
  </div>
);

// Modal Component
const NewsModal = ({ isOpen, onClose, title, time, imageSrc, content }) => {
  if (!isOpen) return null;
  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={imageSrc} alt="News" />
        <h2>{title}</h2>
        <span className="news-time">{time}</span>
        <p>{content}</p>
      </div>
    </div>
  );
};

// News Card Component
const NewsCard = ({ type, title, time, imageSrc, onClick }) => {
  const handleClick = () => {
    onClick({ title, time, imageSrc, content: `Full details about "${title}" go here.` });
  };

  if (type === 'primary') {
    return (
      <div className="news company-news-1" onClick={handleClick}>
        <img className='company-news-1-image' src={imageSrc} alt="news" />
        <h1>{title}</h1>
        <span className='news-time'>{time}</span>
      </div>
    );
  } else if (type === 'secondary') {
    return (
      <div className="news company-news-2" onClick={handleClick}>
        <img className='company-news-2-image' src={imageSrc} alt="news" />
        <div>
          <h3 className='company-news-3-title'>{title}</h3>
          <span className='news-time'>{time}</span>
        </div>
      </div>
    );
  } else if (type === 'tertiary') {
    return (
      <div className="news company-news-3" onClick={handleClick}>
        <img className='company-news-3-image' src={imageSrc} alt="news" />
        <div>
          <p className='company-news-3-title'>{title}</p>
          <span className='news-time'>{time}</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const AirlineNewsPost = ({ title, time, imageSrc, onClick }) => {
  const handleClick = () => {
    onClick({ title, time, imageSrc, content: `Full airline news about "${title}" goes here.` });
  };

  return (
    <div className="news airline-news-post" onClick={handleClick}>
      <img className='airline-news-image' src={imageSrc} alt="news" />
      <div>
        <p className='airline-news-title'>{title}</p>
        <span className='news-time'>{time}</span>
      </div>
    </div>
  );
};

const PartnersCarousel = ({ partners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === partners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <div className="partners-container">
      <div 
        className="partners-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="partner-logo" 
            />
            <p className="partner-name">{partner.name}</p>
          </div>
        ))}
      </div>
      <div className="partners-dots">
        {partners.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const News = () => {
  const [modalData, setModalData] = useState(null);
  const openModal = (data) => setModalData(data);
  const closeModal = () => setModalData(null);

  const partners = [
    { name: "ABC Airlines", logo: "image.png" },
    { name: "DEF Travel", logo: "image.png" },
    { name: "GHI Aviation", logo: "image.png" },
    { name: "JKL Airways", logo: "image.png" },
    { name: "MNO Tours", logo: "image.png" },
  ];

  return (
    <div className="news-page">
      <div className='main-news'>
        <div className="company-news">
          <NewsSection title="Company News" innerClassName="company-news-inner">
            <div className="company-news-container">
              <NewsCard
                type="primary"
                title="Company Launch Event"
                time="10:00 AM on June 10"
                imageSrc="image.png"
                onClick={openModal}
              />
              <div className="company-news-secondary-group">
                <NewsCard
                  type="secondary"
                  title="Quarterly Update"
                  time="11:00 AM on June 9"
                  imageSrc="image.png"
                  onClick={openModal}
                />
                <NewsCard
                  type="tertiary"
                  title="New Feature Rollout"
                  time="12:00 PM on June 8"
                  imageSrc="image.png"
                  onClick={openModal}
                />
              </div>
            </div>
          </NewsSection>
        </div>

        <div className='airlines'>
          <div className='airline-news'>
            <NewsSection title="Airline News" innerClassName="airline-news-inner">
              <AirlineNewsPost
                title="Flight Upgrades Announced"
                time="9:00 AM on June 7"
                imageSrc="image.png"
                onClick={openModal}
              />
              <AirlineNewsPost
                title="New Routes Introduced"
                time="8:00 AM on June 6"
                imageSrc="image.png"
                onClick={openModal}
              />
            </NewsSection>
          </div>

          <div className='airline-partners'>
            <NewsSection title="Our Partners" innerClassName="airline-partners-inner">
              <PartnersCarousel partners={partners} />
            </NewsSection>
          </div>
        </div>
      </div>
      <NewsModal isOpen={!!modalData} onClose={closeModal} {...modalData} />
    </div>
  );
};

export default News;
