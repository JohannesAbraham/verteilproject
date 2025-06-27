import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
import { Typography } from "@mui/material";

import ProfilePage from '../ProfilePage'


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
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const days = generateCalendarDays(selectedYear, selectedMonth);

  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;
  const isHoliday = (date) => holidays.some(h => new Date(h.date).toDateString() === date.toDateString());
  const isToday = (date) => date.toDateString() === today.toDateString();

  const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value));
  const handleYearChange = (e) => setSelectedYear(Number(e.target.value));

  const filteredHolidays = holidays.filter(h => {
    const holidayDate = new Date(h.date);
    return (
      holidayDate.getMonth() === selectedMonth &&
      holidayDate.getFullYear() === selectedYear
    );
  });

  return (
  <div className="calendar-box card">
    <Typography variant="h6"><CalendarMonthIcon className="icon-title" /> Calendar</Typography>

    <div className="calendar-grid">
      
        <div className="calendar-selectors">
          <select value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange}>
            {[2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

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

        {Array((7 - (days.length + days[0].getDay()) % 7) % 7).fill(null).map((_, i) => (
          <div key={"empty-end-" + i} className="calendar-day empty"></div>
        ))}
      </div>

      <div className="holiday-list">
        <h3>Holidays</h3>
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
  const [mediaContent, setMediaContent] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/media/getmedia')
    .then(response => setMediaContent(response.data))
    .catch(error => console.error("Error fetching media content:", error));
  },[]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaContent.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [mediaContent]);

  

  const currentMedia = mediaContent[currentMediaIndex];

  const HandleClick = () => {
    navigate("/uploadmedia");
    console.log("Navigating to media upload page");
  }

  const handleDelete = async(id) => {
    const password = prompt("Enter admin password to delete:");
    if(!password){
      return
    }

    try{
      await axios.post(`http://localhost:5000/api/media/delete`,{id,password});
      setMediaContent(mediaContent.filter(media => media._id !== id));
    }
    catch(e){
      console.error("Error deleting media:", e);
      alert("Failed to delete media");
    }
  }

  return (
    <div className="media-box card">
      <h2><TheatersIcon className="icon-title" />Media Corner</h2>
      <div className="media-slideshow">
        {currentMedia && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center p-2">
              <h2 className="p-3">{currentMedia.title}</h2>
              <button onClick={HandleClick} className="bg-lgreen rounded-xl text-light font-ariel py-2 px-4">Add Media</button>
              <button onClick={() => handleDelete(currentMedia._id)} className="bg-red-500 rounded-xl text-light font-ariel py-2 px-4">Delete</button>
            </div>
            <img src={`http://localhost:5000${currentMedia.image}`} alt={currentMedia.title} className="media-image h-[50vh] w-auto object-contain mx-auto rounded-lg"/>
            <p className="p-4">{currentMedia.description}</p>
          </div>
        )}        
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
const [articles,setArticles] = useState([])


  useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/news');
          setArticles(response.data);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
          console.error('Error fetching articles:', err);
        }
      };
      
      fetchArticles();
    }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsList.length);
    }, 10000); // Change highlighted news every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-box card">
  <h2><ArticleIcon className="icon-title" />News</h2>
  <div className="news-list-container">
    {articles.map((news) => (
      <div key={news.id || news._id} className="news-card card">
        <Typography variant="h5" className="news-title">
          {news.title}
        </Typography>
        {news.content && (
          <Typography variant="body2" className="news-content">
            {news.content.length > 100 
              ? `${news.content.substring(0, 100)}...` 
              : news.content}
          </Typography>
        )}
        {news.publishDate && (
          <Typography variant="caption" className="news-date">
            {new Date(news.publishDate).toLocaleDateString()}
          </Typography>
        )}
      </div>
    ))}
  </div>
</div>
  );
};

const WordsBox = () => {

  const [thoughtData, setThoughtData] = useState({ thought: "", author: "", word: "", meaning: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/thoughtword")
      .then(res => {
        if (res.data) setThoughtData(res.data);
      })
      .catch(err => console.error("Failed to load thought/word:", err));
  }, []);

  return(
    <div className='flex flex-col justify-center items-center rounded-lg shadow-lg p-4 mb-4 card'>
      <div className="flex flex-col items-center space-y-8 w-full px-4">
        <div className="border-lgreen border-2 rounded-lg w-full max-w-3xl p-4">
          <h2 className="font-ariel text-dgreen text-2xl font-bold pb-2 flex items-center gap-2">
            <LightbulbIcon className="text-lgreen" /> Thought of the Day
          </h2>
          <p className="thought-content">"{thoughtData.thought}"</p>
          <p className="thought-author text-right font-semibold pr-2">- {thoughtData.author}</p>
        </div>

        <div className="border-lgreen border-2 rounded-lg w-full max-w-3xl p-4">
          <h2 className="text-2xl font-ariel font-bold text-dgreen pb-3 flex items-center gap-2">
            <MenuBookIcon className="text-lgreen" /> Word of the Day
          </h2>
          <h3 className="text-2xl pb-2 text-lgreen font-ariel font-semibold">
            {thoughtData.word}
          </h3>
          <p className="pl-2 text-md font-ariel">{thoughtData.meaning}</p>
        </div>
      </div>

      <button onClick={() => {
        const pwd = prompt("Enter admin password:");
        if (pwd) navigate(`/editthought?pwd=${pwd}`);
      }} className="bg-lgreen text-white rounded px-4 py-1 mt-2">
        Edit
      </button>
    </div>
  );
}

const Home = () => {
  const [showHandbook, setShowHandbook] = useState(false);

  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM d, yyyy");

  const navigate=useNavigate();

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
          <div className="welcome-box card">
            <Typography variant="h4">{formattedDate}</Typography>
            <p className="update-intro">Here's what's happening in our company today:</p>
            <ul className="company-updates">
              <li>3 New Joinees this month!</li>
              <li>3 New Joinees this month!</li>
              <li>Celebrating {birthdays.length} employee birthdays</li>
            </ul>
          </div>

          

          <WordsBox />

          <div className="quick-access-message-container">
          <div className="new-joinees-box card">
            <h2><PeopleIcon className="icon-title" />New Joiners</h2>
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
          <div className="quick-access-box card">
            <Typography variant="h6">Quick Access</Typography>
            <div className="quick-access-grid">
              <div className="quick-column">
                <div className="quick-item" onClick={() => navigate('/profile')}>
                  Profile
                </div>
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
                  <a href="/quickgames" target="_blank" rel="noopener noreferrer">
                    <SportsEsportsIcon className="icon" />
                    <p className="para">Games</p>
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div className="birthday-box card">
            <Typography variant="h6"><CakeIcon className="icon-title" /> Birthdays This Week</Typography>
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

          <div className="anniversary-box card">
            <Typography variant="h6"><CelebrationIcon className="icon-title" /> Work Anniversaries</Typography>
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