import React, { useState, useEffect } from "react";
import "./Home.css";
import { format } from "date-fns";
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import BookIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';
import CakeIcon from '@mui/icons-material/Cake';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TheatersIcon from '@mui/icons-material/Theaters';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const placeholderImage = "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg";
const profilePlaceholder = "https://randomuser.me/api/portraits/";

const newsList = [
  { 
    id: 1, 
    title: "Quarterly results announced"
  },
  { 
    id: 2, 
    title: "New project launch next week"
  },
  { 
    id: 3, 
    title: "Office closed on June 5th"
  },
  { 
    id: 4, 
    title: "Annual Team Building Event"
  },
  { 
    id: 5, 
    title: "New Employee Benefits Policy"
  },
];

const mediaContent = [
  { 
    type: "book-review", 
    title: "Atomic Habits by James Clear", 
    review: "A revolutionary guide to building good habits and breaking bad ones. This book provides practical strategies for forming habits that stick.",
    rating: "4.5/5",
    url: "https://m.media-amazon.com/images/I/51B7kuFwQFL._SY425_.jpg" 
  },
  { 
    type: "movie-review", 
    title: "The Social Dilemma (2020)", 
    review: "A powerful documentary-drama hybrid that explores the dangerous human impact of social networking.", 
    rating: "4/5",
    url: "https://m.media-amazon.com/images/M/MV5BOTYwM2YxOTAtODUzZi00NGFkLTg0NWItMDQ5ZTI5ZWM0OTU5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" 
  },
  { 
    type: "article", 
    title: "The Future of Remote Work", 
    content: "How hybrid work models are shaping the post-pandemic workplace and what it means for employee productivity and satisfaction.",
    url: placeholderImage 
  },
  { 
    type: "video", 
    title: "Motivational Video: Start Your Day Right", 
    content: "A 5-minute morning routine to boost your productivity and mindset for the day ahead.",
    url: placeholderImage 
  }
];

const holidays = [
  { date: "2025-01-26", name: "Republic Day" },
  { date: "2025-02-26", name: "Sivaratri" },
  { date: "2025-03-31", name: "Id-Ul-Fitr (Ramzan)" },
  { date: "2025-04-14", name: "Vishu / Dr B R Ambedkar Jayanthi" },
  { date: "2025-04-18", name: "Good Friday" },
  { date: "2025-04-20", name: "Easter" },
  { date: "2025-05-01", name: "May Day" },
  { date: "2025-06-06", name: "Id-Ul Ad'Ha (Bakrid)" },
  { date: "2025-08-15", name: "Independence Day" },
  { date: "2025-09-04", name: "First Onam" },
  { date: "2025-09-05", name: "Thiruvonam / Milad-I-Sherif" },
  { date: "2025-10-02", name: "Vijayadasami / Gandhi Jayanthi" },
  { date: "2025-10-25", name: "Deepavali" },
  { date: "2025-12-25", name: "Christmas" },
];

const birthdays = [
  { name: "John Doe", date: "May 30", department: "Engineering", image: `${profilePlaceholder}men/1.jpg` },
  { name: "Jane Smith", date: "June 2", department: "Marketing", image: `${profilePlaceholder}women/1.jpg` }
];

const anniversaries = [
  { name: "Alice Johnson", years: "5", department: "HR", image: `${profilePlaceholder}women/2.jpg` },
  { name: "Bob Brown", years: "3", department: "Finance", image: `${profilePlaceholder}men/2.jpg` }
];

const newJoinees = [
  { name: "Alex Johnson", role: "Software Engineer", department: "Engineering", joiningDate: "2025-06-01", image: `${profilePlaceholder}men/3.jpg` },
  { name: "Sarah Williams", role: "UX Designer", department: "Design", joiningDate: "2025-06-03", image: `${profilePlaceholder}women/3.jpg` },
  { name: "Michael Chen", role: "Product Manager", department: "Product", joiningDate: "2025-06-10", image: `${profilePlaceholder}men/4.jpg` }
];

const thoughtOfTheDay = "Success is not final, failure is not fatal: It is the courage to continue that counts.";
const wordOfTheDay = { word: "Synergy", meaning: "The interaction of elements that when combined produce a total effect greater than the sum of the individual elements" };

function generateCalendarDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const CalendarBox = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = generateCalendarDays(year, month);

  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;
  const isHoliday = (date) => holidays.some(h => new Date(h.date).toDateString() === date.toDateString());
  const isToday = (date) => date.toDateString() === today.toDateString();

  // Filter holidays to show only current and next month
  const currentMonth = today.getMonth();
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const currentYear = today.getFullYear();
  const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;

  const filteredHolidays = holidays.filter(h => {
    const holidayDate = new Date(h.date);
    const holidayMonth = holidayDate.getMonth();
    const holidayYear = holidayDate.getFullYear();
    
    return (
      (holidayMonth === currentMonth && holidayYear === currentYear) ||
      (holidayMonth === nextMonth && holidayYear === nextYear)
    );
  });

  return (
  <div className="calendar-box">
    <h2><CalendarMonthIcon className="icon-title" />Calendar & Holidays</h2>
    <div className="calendar-grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
        <div key={day} className="calendar-day header">{day}</div>
      ))}

      {Array(days[0].getDay()).fill(null).map((_, i) => (
        <div key={"empty-start-" + i} className="calendar-day empty"></div>
      ))}

      {days.map((date) => {
        const dayNum = date.getDate();
        const weekend = isWeekend(date);
        const holiday = isHoliday(date);
        return (
          <div
            key={date.toISOString()}
            className={`calendar-day 
              ${weekend ? "weekend" : ""} 
              ${holiday ? "holiday" : ""} 
              ${isToday(date) ? "today" : ""}`}
            title={holiday ? holidays.find(h => new Date(h.date).toDateString() === date.toDateString()).name : ""}
          >
            {dayNum}
            {holiday && <span className="holiday-dot"></span>}
          </div>
        );
      })}

      {/* Fill the trailing cells to make the grid a multiple of 7 */}
      {Array((7 - (days.length + days[0].getDay()) % 7) % 7).fill(null).map((_, i) => (
        <div key={"empty-end-" + i} className="calendar-day empty"></div>
      ))}
    </div>

    <div className="holiday-list">
      <h3>Upcoming Holidays & Off Days</h3>
      <ul>
        {filteredHolidays.map((h) => (
          <li key={h.date}>
            <strong>{new Date(h.date).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</strong>: {h.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

};

const MediaBox = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaContent.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const currentMedia = mediaContent[currentMediaIndex];

  return (
    <div className="media-box">
      <h2><TheatersIcon className="icon-title" />Media Corner</h2>
      <div className="media-slideshow">
        <img src={currentMedia.url} alt={currentMedia.title} className="media-content" />
        <div className="media-info">
          <h3>{currentMedia.title}</h3>
          {currentMedia.type === "book-review" && (
            <>
              <p className="media-review">{currentMedia.review}</p>
              <p className="media-rating">Rating: {currentMedia.rating}</p>
            </>
          )}
          {currentMedia.type === "movie-review" && (
            <>
              <p className="media-review">{currentMedia.review}</p>
              <p className="media-rating">Rating: {currentMedia.rating}</p>
            </>
          )}
          {currentMedia.type === "article" && (
            <p className="media-content-text">{currentMedia.content}</p>
          )}
          {currentMedia.type === "video" && (
            <p className="media-content-text">{currentMedia.content}</p>
          )}
        </div>
      </div>
      <div className="media-dots">
        {mediaContent.map((_, index) => (
          <span 
            key={index} 
            className={`media-dot ${index === currentMediaIndex ? "active" : ""}`}
            onClick={() => setCurrentMediaIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const NewsBox = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsList.length);
    }, 10000); // Change highlighted news every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
     <div className="news-box">
      <h2><ArticleIcon className="icon-title" />Company News</h2>
      <ul className="news-headings-list">
        {newsList.map((news) => (
          <li key={news.id} className="news-heading-item">
            {news.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home = () => {
  const [showHandbook, setShowHandbook] = useState(false);

  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  return (
    <>
      {showHandbook && (
        <div className="modal-overlay" onClick={() => setShowHandbook(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowHandbook(false)}>×</button>
            <iframe
              src="Handbook.pdf"
              title="Employee Handbook"
              width="100%"
              height="600px"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}

      <div className="dashboard-container">
        <div className="left-space"></div>
        <div className="main-column">
          <div className="welcome-box">
            <h1>Welcome Back</h1>
            <h3>{formattedDate}</h3>
            <p className="update-intro">Here's what's happening in our company today:</p>
            <ul className="company-updates">
              <li>Deadline for submitting Q2 reports</li>
              <li>Client demo scheduled with XYZ Corp</li>
              <li>Celebrating {birthdays.length} employee birthdays</li>
            </ul>
          </div>

          <div className="thought-word-container">
            <div className="thought-box">
              <h2><LightbulbIcon className="icon-title" />Thought of the Day</h2>
              <p className="thought-content">"{thoughtOfTheDay}"</p>
              <p className="thought-author">- Winston Churchill</p>
            </div>
            <div className="word-box">
              <h2><MenuBookIcon className="icon-title" />Word of the Day</h2>
              <h3 className="word">{wordOfTheDay.word}</h3>
              <p className="meaning">{wordOfTheDay.meaning}</p>
            </div>
          </div>

          <div className="quick-access-message-container">
          <div className="new-joinees-box">
  <h2><PeopleIcon className="icon-title" />New Joinees</h2>
  <div className="celebration-list">
    {newJoinees.map((person, index) => (
      <div key={index} className="celebration-item">
        <img src={person.image} alt={person.name} className="profile-pic" />
        <div className="celebration-details">
          <h3>{person.name}</h3>
          <p>{person.role} • {person.department}</p>
          <p>Joined on {new Date(person.joiningDate).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}</p>
        </div>
      </div>
    ))}
  </div>
</div>

          </div>

          <MediaBox />
          <NewsBox />
        </div>

        <div className="events-column">
          <div className="quick-access-box">
  <h2>Quick Access</h2>
  <div className="quick-access-grid">
    <div className="quick-column">
      <div className="quick-item">
        <a href="https://www.verteil.com/" target="_blank" rel="noopener noreferrer">
          <CampaignIcon className="icon" />
          <p className="para">Verteil</p>
        </a>
      </div>
      <div className="quick-item" onClick={() => setShowHandbook(true)} style={{ cursor: "pointer" }}>
        <BookIcon className="icon" />
        <p className="para">Handbook</p>
      </div>
      <div className="quick-item">
        <a href="https://www.greythr.com/login/" target="_blank" rel="noopener noreferrer">
          <GroupsIcon className="icon" />
          <p className="para">GreytHR</p>
        </a>
      </div>
    </div>
    <div className="quick-column">
      <div className="quick-item">
        <a href="https://www.greythr.com/login/" target="_blank" rel="noopener noreferrer">
          <PeopleIcon className="icon" />
          <p className="para">V-Depot</p>
        </a>
      </div>
      <div className="quick-item">
        <a href="https://www.zappyhire.com/" target="_blank" rel="noopener noreferrer">
          <PeopleIcon className="icon" />
          <p className="para">Hiring-Referrals</p>
        </a>
      </div>
      <div className="quick-item">
        <a href="/quickgames" rel="noopener noreferrer">
          <SportsEsportsIcon className="icon" />
          <p className="para">Games</p>
        </a>
      </div>
    </div>
  </div>
</div>


          <div className="birthday-box">
            <h2><CakeIcon className="icon-title" />Birthdays This Week</h2>
            <div className="celebration-list">
              {birthdays.map((person, index) => (
                <div key={index} className="celebration-item">
                  <img src={person.image} alt={person.name} className="profile-pic" />
                  <div className="celebration-details">
                    <h3>{person.name}</h3>
                    <p>{person.date} • {person.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="anniversary-box">
            <h2><CelebrationIcon className="icon-title" />Work Anniversaries</h2>
            <div className="celebration-list">
              {anniversaries.map((person, index) => (
                <div key={index} className="celebration-item">
                  <img src={person.image} alt={person.name} className="profile-pic" />
                  <div className="celebration-details">
                    <h3>{person.name}</h3>
                    <p>{person.years} Years • {person.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CalendarBox />
        </div>
      </div>
    </>
  );
};

export default Home;