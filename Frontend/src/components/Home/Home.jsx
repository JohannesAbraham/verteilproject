import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Home.css";
import { format } from "date-fns";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import BookIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';
import CakeIcon from '@mui/icons-material/Cake';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TheatersIcon from '@mui/icons-material/Theaters';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import GroupsIcon from '@mui/icons-material/Groups';

const placeholderImage = "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg";
const profilePlaceholder = "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";

const newsList = [
  { id: 1, title: "Quarterly results announced", date: "2025-05-25", image: placeholderImage },
  { id: 2, title: "New project launch next week", date: "2025-05-28", image: placeholderImage },
  { id: 3, title: "Office closed on June 5th", date: "2025-06-01", image: placeholderImage },
  { id: 4, title: "Annual Team Building Event", date: "2025-06-10", image: placeholderImage },
  { id: 5, title: "New Employee Benefits Policy", date: "2025-06-15", image: placeholderImage },
];

const mediaContent = [
  { type: "cartoon", title: "Funny Office Cartoon", url: placeholderImage },
  { type: "video", title: "Motivational Video", url: placeholderImage },
  { type: "image", title: "Team Photo", url: placeholderImage }
];

const holidays = [
  { date: "2025-06-01", name: "Company Foundation Day" },
  { date: "2025-06-15", name: "Summer Break" },
  { date: "2025-06-26", name: "Public Holiday" },
];

const birthdays = [
  { name: "John Doe", date: "May 30", department: "Engineering", image: profilePlaceholder },
  { name: "Jane Smith", date: "June 2", department: "Marketing", image: profilePlaceholder }
];

const anniversaries = [
  { name: "Alice Johnson", years: "5", department: "HR", image: profilePlaceholder },
  { name: "Bob Brown", years: "3", department: "Finance", image: profilePlaceholder }
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

  return (
    <div className="calendar-box">
      <h2>Calendar & Holidays</h2>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="calendar-day header">{day}</div>
        ))}
        {Array(days[0].getDay()).fill(null).map((_, i) => (
          <div key={"empty-" + i} className="calendar-day empty"></div>
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
      </div>
      <div className="holiday-list">
        <h3>Upcoming Holidays & Off Days</h3>
        <ul>
          {holidays.map((h) => (
            <li key={h.date}>
              <strong>{new Date(h.date).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</strong>: {h.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Home = () => {
  const [enlargedNewsIndex, setEnlargedNewsIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [showHandbook, setShowHandbook] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnlargedNewsIndex((prev) => (prev + 1) % newsList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaInterval = setInterval(() => {
      setMediaIndex((prev) => (prev + 1) % mediaContent.length);
    }, 8000);
    return () => clearInterval(mediaInterval);
  }, []);

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
              <li>Town hall meeting at 2 PM in Conference Room A</li>
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
            <div className="capsule-box">
              <h2><MedicationLiquidIcon className="icon-title" />Capsule of the Day</h2>
              <ul className="capsule-list">
                <li><span className="capsule-icon">✅</span><strong>Yesterday:</strong> Completed internal team sync and finance audit successfully.</li>
                <li><span className="capsule-icon">🌟</span><strong>Star Performer:</strong> Jane Smith (Marketing) for leading the ad campaign launch.</li>
                <li><span className="capsule-icon">🔔</span><strong>Reminder:</strong> Submit Q2 budget plan by 3 PM today.</li>
                <li><span className="capsule-icon">📅</span><strong>Upcoming:</strong> Leadership workshop on Friday at 10 AM.</li>
                <li><span className="capsule-icon">💡</span><strong>Tip:</strong> Use keyboard shortcuts in your workflow to boost productivity.</li>
              </ul>
            </div>
          </div>

          <div className="media-box">
            <h2><TheatersIcon className="icon-title" />Media Corner</h2>
            <img src={mediaContent[mediaIndex].url} alt={mediaContent[mediaIndex].title} className="media-content" />
            <p className="media-title">{mediaContent[mediaIndex].title}</p>
          </div>

          <div className="news-box">
            <h2><ArticleIcon className="icon-title" />Company News</h2>
            <div className="news-list">
              {newsList.map((news, index) => (
                <div key={news.id} className={`news-item ${enlargedNewsIndex === index ? "enlarged" : "minimized"}`}>
                  <img src={news.image} alt="News" className="news-image" loading="lazy" />
                  <div className="news-content">
                    <h3>{news.title}</h3>
                    <p className="news-date">{new Date(news.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="events-column">
          <div className="quick-access-box">
            <h2>Quick Access</h2>
            <div className="quick-items">
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
              <div className="quick-item">
                <a href="https://www.greythr.com/login/" target="_blank" rel="noopener noreferrer">
                  <PeopleIcon className="icon" />
                  <p className="para">V-Depot</p>
                </a>
              </div>
              <div className="quick-item">
                <a href="https://www.zappyhire.com/" target="_blank" rel="noopener noreferrer">
                  <PeopleIcon className="icon" />
                  <p className="para">Hiring and Referrals</p>
                </a>
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
