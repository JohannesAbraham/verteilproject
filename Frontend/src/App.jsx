import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Popquiz from "./components/quickgames/Popquiz/PopQuiz.jsx";
import Gamelist from "./components/quickgames/Gameslist/games";
import SuggestionManagement from "./components/Suggestion Management/SuggestionManagement";
import MediaBox from "./components/MediaUpload";
import EditThought from "./components/EditThought";
import QuizManager from "./components/quickgames/AdminAccess/AdminQuizPanel";
import TreePage from './components/Career Framework/Tree.jsx'
import JobDescription from './components/Career Framework/JobDescription.jsx';
// import Verite from "./components/Verite.jsx";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter =
  location.pathname.startsWith('/quickgames') || location.pathname.startsWith('/games');

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/me', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user); // use this in your app
        } else {
          window.location.href = 'http://localhost:5000/auth/google'; // not logged in
        }
      })
      .catch(() => {
        window.location.href = 'http://localhost:5000/auth/google';
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!user) return <h2>Logging in...</h2>;

  return (
    <div className="app-container">
     {!hideHeaderFooter && <Header />}
     {!hideHeaderFooter && <Navbar />}
    
        
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
            <Route path="/quickgames/popupquiz" element={<Popquiz />}></Route>  
            <Route path="/quickgames" element={<Gamelist />}></Route>
            <Route path="/uploadmedia" element={<MediaBox />}></Route>
            <Route path="/editthought" element={<EditThought />}></Route>
            <Route path="/quizmanager" element={<QuizManager />} />
            <Route path="/news-management" element={<NewsManagement/>}></Route>
          </Routes>
      
      
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
