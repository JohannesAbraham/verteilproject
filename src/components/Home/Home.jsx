import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Home.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PeopleIcon from '@mui/icons-material/People';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';



const newsList = [
  { id: 1, title: "Quarterly results announced", date: "2025-05-25", image: "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" },
  { id: 2, title: "New project launch next week", date: "2025-05-28", image: "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" },
  { id: 3, title: "Office closed on June 5th", date: "2025-06-01", image: "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" },
  { id: 4, title: "Annual Team Building Event", date: "2025-06-10", image: "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" },
  { id: 5, title: "New Employee Benefits Policy", date: "2025-06-15", image: "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" },
];

const photos = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=60",
];

const holidays = [
  { date: "2025-06-01", name: "Company Foundation Day" },
  { date: "2025-06-15", name: "Summer Break" },
  { date: "2025-06-26", name: "Public Holiday" },
];

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

  return (
    <div className="calendar-box">
      <h2> Calendar & Holidays</h2>
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
              className={`calendar-day ${weekend ? "weekend" : ""} ${holiday ? "holiday" : ""}`}
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
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnlargedNewsIndex((prev) => (prev + 1) % newsList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const photoInterval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(photoInterval);
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="left-space"></div>

        <div className="main-column">
          <div className="welcome-box">
            <h1>Welcome Back</h1>
            <h3>Here's what's happening at your company today.</h3>
            <div className="stats">
              <div className="stat-item"> <AccessTimeIcon className="icon"/> <p className="para">Total Working Hours: 160</p></div>
              <div className="stat-item"> <FolderCopyIcon className="icon"/> <p className="para">Active Projects: 5</p></div>
              <div className="stat-item"><TaskAltIcon className="icon"/><p className="para">Completed Tasks: 20</p></div>
              <div className="stat-item"><CalendarMonthIcon className="icon"/><p className="para">Leave Days Left: 8</p></div>
            </div>
          </div>

          <div className="quick-access-message-container">
            <div className="message-box">
              <h2>
                 <CampaignIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
  Message from the Boss
             </h2>
              <p>
                Team, keep up the great work! Remember to submit your weekly reports by Friday. Let's aim for a productive month ahead.
              </p>
            </div>
          </div>

          <div className="photo-box">
            <img
              src={photos[photoIndex]}
              alt="Company Work"
              className="photo-slide"
            />
          </div>

          <div className="new-joinee-box">
            

<h2>
  <GroupIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
  New Joinees
</h2>

            <ul>
              <li>Anna Mathew - Developer</li>
              <li>Rahul Nair - QA Engineer</li>
              <li>Fatima Khan - UX Designer</li>
            </ul>
          </div>

          <div className="news-box">
            <h2>
  <ArticleIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
  Company News
</h2>
            <div className="news-list">
              {newsList.map((news, index) => (
                <div
                  key={news.id}
                  className={`news-item ${enlargedNewsIndex === index ? "enlarged" : "minimized"}`}
                >
                  <img
                    src={news.image}
                    alt="News"
                    className="news-image"
                    loading="lazy"
                  />
                  <div className="news-content">
                    <h3>{news.title}</h3>
                    <p className="news-date">
                      {new Date(news.date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
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
                <div className="quick-item"><FlightTakeoffIcon className="icon"/><p className="para"> Leave</p></div>
                <div className="quick-item"><PeopleIcon className="icon"/><p className="para"> New Joinees</p></div>
                <div className="quick-item"><CalendarMonthIcon className="icon"/><p className="para"> Working Days Left</p></div>
                <div className="quick-item"><HourglassTopIcon className="icon"/><p className="para"> Pending Works</p></div>
              </div>
            </div>
          <div className="birthday-box">
            <h2>🎂 Birthdays This Week</h2>
            <ul>
              <li>John Doe - May 30</li>
              <li>Jane Smith - June 2</li>
            </ul>
          </div>

          <div className="anniversary-box">
            <h2>🎉 Work Anniversaries</h2>
            <ul>
              <li>Alice Johnson - 5 Years</li>
              <li>Bob Brown - 3 Years</li>
            </ul>
          </div>

          <CalendarBox />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
