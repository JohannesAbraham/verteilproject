import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ProfilePage from "./components/ProfilePage";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Suggestion from "./components/Suggestion/Suggestion";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import News from './components/News/News';
import OrgStructure from "./components/Org Structure/OrgStructure";
import CareerFramework from "./components/Career Framework/CFramework";
import Sudoku from "./components/quickgames/Sudoku/Sudoku";
import Popupquiz from "./components/quickgames/Popupquiz/Popupquiz";
import Gamelist from "./components/quickgames/Gameslist/games";
import SuggestionManagement from "./components/Suggestion Management/SuggestionManagement";
import MediaBox from "./components/MediaUpload";
import EditThought from "./components/EditThought";
import QuizManager from "./components/quickgames/AdminAccess/AdminQuizPanel";
import backgroundImage from '/glass-frosting-design.jpg';

// Sub component to manage routes & layout
const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname.startsWith('/quickgames') || location.pathname.startsWith('/games');

  return (
    <div className="app-container">
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <Navbar />}
      <img src={backgroundImage} alt="background" className="background-image" />

      <div className="content-wrapper">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/suggestion" element={<Suggestion />} />
          <Route path="/news" element={<News />} />
          <Route path="/orgstructure" element={<OrgStructure />} />
          <Route path="/career-framework" element={<CareerFramework />} />
          <Route path="/suggestion-management" element={<SuggestionManagement />} />
          <Route path="/uploadmedia" element={<MediaBox />} />
          <Route path="/editthought" element={<EditThought />} />
          <Route path="/quizmanager" element={<QuizManager />} />

          {/* Quick Games */}
          <Route path="/quickgames" element={<Gamelist />} />
          <Route path="/quickgames/sudoku" element={<Sudoku />} />
          <Route path="/quickgames/popupquiz" element={<Popupquiz />} />
        </Routes>
      </div>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

// Final App with Router wrapper
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
