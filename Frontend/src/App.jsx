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
import OrgStructure from "./components/Org Structure/OrgStructure.jsx";
import CareerFramework from "./components/Career Framework/CFramework";
import NewsManagement from "./components/News Management/NewsManagement.jsx";
import Sudokuboard from "./components/quickgames/Sudoku/Sudoku";
import Popupquiz from "./components/quickgames/Popupquiz/Popupquiz";
import Gamelist from "./components/quickgames/Gameslist/games";
import SuggestionManagement from "./components/Suggestion Management/SuggestionManagement";
import MediaBox from "./components/MediaUpload";
import EditThought from "./components/EditThought";
import QuizManager from "./components/quickgames/AdminAccess/AdminQuizPanel";
import TreePage from './components/Career Framework/Tree.jsx'
import JobDescription from './components/Career Framework/JobDescription.jsx';
// import Verite from "./components/Verite.jsx";
import backgroundImage from '/glass-frosting-design.jpg';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname.startsWith('/quickgames') || location.pathname.startsWith('/games');

  return (
    <div className="app-container">
     {!hideHeaderFooter && <Header />}
     {!hideHeaderFooter && <Navbar />}
    {/* //   <img src={backgroundImage} alt="background" className="background-image" />

    
      // <div className="content-wrapper"> */}
        
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            {/*<Route path="/" element={<Login />}></Route>*/}
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
        {/* </div> */}
      {/* //   <Footer /> */}
      
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
