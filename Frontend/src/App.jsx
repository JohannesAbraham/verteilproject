import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Suggestion from "./components/Suggestion/Suggestion";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import News from './components/News/News';
import OrgStructure from './components/Org Structure/OrgStructure';
import CareerFramework from "./components/Career Framework/CFramework";
import Sudoku from "./components/quickgames/Sudoku/Sudoku";
import Popupquiz from "./components/quickgames/Popupquiz/Popupquiz";
import Gamelist  from "./components/quickgames/Gameslist/games";
import NewsManagement from "./components/News Management/NewsManagement";
import SuggestionManagement from "./components/Suggestion Management/SuggestionManagement";
import MediaBox from "./components/MediaUpload";
import EditThought from "./components/EditThought";
import QuizManager from "./components/quickgames/AdminAccess/AdminQuizPanel";
// import Verite from "./components/Verite.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/suggestion" element={<Suggestion />} />
            <Route path="/news" element={<News />} />
            <Route path="/org-structure" element={<OrgStructure />} />
            <Route path="/career-framework" element={<CareerFramework />} />
            <Route path="/news-management" element={<NewsManagement />} />
            <Route path="/suggestion-management" element={<SuggestionManagement />} />
            <Route path="/quickgames/sudoku" element={<Sudoku/>} />
            <Route path="/quickgames/popupquiz" element={<Popupquiz />} />
            <Route path="/quickgames" element={<Gamelist />} />
            <Route path="/uploadmedia" element={<MediaBox />} />
            <Route path="/editthought" element={<EditThought />} />
            <Route path="/quizmanager" element={<QuizManager />} />
            {/* <Route path="/verite" element={<Verite />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
