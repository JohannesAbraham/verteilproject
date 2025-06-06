import React from 'react'
import './News.css'

// News Card Component for Company News (unchanged)
const NewsCard = ({ type, title, time, imageSrc }) => {
  if (type === 'primary') {
    return (
      <div className="news company-news-1">
        <img className='company-news-1-image' src={imageSrc} alt="news photo" />
        <h1>{title}</h1>
        <span className='news-time'>{time}</span>
      </div>
    )
  } else if (type === 'secondary') {
    return (
      <div className="news company-news-2">
        <img className='company-news-2-image' src={imageSrc} alt="news photo" />
        <div>
            <h3 className='company-news-3-title'>{title}</h3>
            <span className='news-time'>{time}</span>
        </div>
        
      </div>
    )
  } else if (type === 'tertiary') {
    return (
      <div className="news company-news-3">
        <img className='company-news-3-image' src={imageSrc} alt="news photo" />
        <div>
          <p className='company-news-3-title'>{title}</p>
          <span className='news-time'>{time}</span>
        </div>
      </div>
    )
  }
}

// Airline News Post Component (unchanged)
const AirlineNewsPost = ({ title, time, imageSrc }) => {
  return (
    <div className="news airline-news-post">
      <img className='airline-news-image' src={imageSrc} alt="news photo" />
      <div>
        <p className='airline-news-title'>{title}</p>
        <span className='news-time'>{time}</span>
      </div>
    </div>
  )
}

// News Section Component (unchanged)
const NewsSection = ({ title, children, innerClassName }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div className={innerClassName}>
        {children}
      </div>
    </div>
  )
}

const News = () => {
  return (
    <>
      <div className='main-news'>
        {/* Company News Section - Modified layout */}
        <div className="company-news">
          <NewsSection 
            title="Company News" 
            innerClassName="company-news-inner"
          >
            <div className="company-news-container">
              <NewsCard 
                type="primary"
                title="Lorem ipsum dolor sit amet consectetur"
                time="XX:XX on Feb 29th"
                imageSrc="image.png"
              />
              
              <div className="company-news-secondary-group">
                <NewsCard 
                  type="secondary"
                  title="Lorem ipsum dolor sit amet consectetur"
                  time="XX:XX on Feb 29th"
                  imageSrc="image.png"
                />
                <NewsCard 
                  type="tertiary"
                  title="Lorem ipsum dolor sit amet consectetur"
                  time="XX:XX on Feb 29th"
                  imageSrc="image.png"
                />
              </div>
            </div>
          </NewsSection>
        </div>
        
        {/* Airlines Section (unchanged) */}
        <div className='airlines'>
          <div className='airline-news'>
            <NewsSection 
              title="Airline News" 
              innerClassName="airline-news-inner"
            >
              <AirlineNewsPost 
                title="Lorem ipsum dolor sit amet consectetur"
                time="XX:XX on Feb 29th"
                imageSrc="image.png"
              />
              <AirlineNewsPost 
                title="Lorem ipsum dolor sit amet consectetur"
                time="XX:XX on Feb 29th"
                imageSrc="image.png"
              />
              <AirlineNewsPost 
                title="Lorem ipsum dolor sit amet consectetur"
                time="XX:XX on Feb 29th"
                imageSrc="image.png"
              />
            </NewsSection>
          </div>
          
          <div className='airline-partners'>
            <NewsSection 
              title="Our Partners" 
              innerClassName="airline-partners-inner"
            >
              <div className="partners-flex">
                <img src="image.png" alt="Partner logo" className="partner-logo" />
                <img src="image.png" alt="Partner logo" className="partner-logo" />
                <img src="image.png" alt="Partner logo" className="partner-logo" />
                <img src="image.png" alt="Partner logo" className="partner-logo" />
              </div>
            </NewsSection>
          </div>
        </div>
      </div>
      <div>More News</div>
    </>
  )
}

export default News