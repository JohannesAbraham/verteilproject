import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Suggestion from "./components/Suggestion/Suggestion";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import News from './components/News/News';
import OrgStructure from "./components/Org Structure/OrgStructure.jsx";
import CareerFramework from "./components/Career Framework/CFramework";
import NewsManagement from "./components/News Management/NewsManagement.jsx";
import Sudokuboard from "./components/quickgames/Sudoku/Sudoku";
import Popupquiz from "./components/quickgames/Popupquiz/Popupquiz";
import Gamelist  from "./components/quickgames/Gameslist/games";
import SuggestionManagement from "./components/Suggestion Management/SuggestionManagement";
import MediaBox from "./components/MediaUpload";
import EditThought from "./components/EditThought";
import LoginPage from "../src/components/LoginPage";
import ProfilePage from "../src/components/ProfilePage";
import backgroundImage from '/glass-frosting-design.jpg';
import QuizManager from "./components/quickgames/AdminAccess/AdminQuizPanel";
import TreePage from './components/Career Framework/Tree.jsx'
import JobDescription from './components/Career Framework/JobDescription.jsx';
// import Verite from "./components/Verite.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <img src={backgroundImage} alt="" className="background-image" />
      <div className="content-wrapper">
        <Router>
          <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/suggestion" element={<Suggestion />}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/org-structure" element={<OrgStructure />}></Route>
            <Route path="/tree" element={<TreePage />} />
            <Route path="/job/:name" element={<JobDescription />} />
            <Route path="/suggestion-management" element={<SuggestionManagement />}></Route>
            <Route path="/quickgames/sudoku" element={<Sudokuboard />}></Route>
            <Route path="/quickgames/popupquiz" element={<Popupquiz />}></Route>  
            <Route path="/quickgames" element={<Gamelist />}></Route>
            <Route path="/uploadmedia" element={<MediaBox />}></Route>
            <Route path="/editthought" element={<EditThought />}></Route>
            <Route path="/quizmanager" element={<QuizManager />} />
            <Route path="/news-management" element={<NewsManagement/>}></Route>
          </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    
  );
}

export default App;
