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
import OrgStructure from './components/Org Structure/OrgStructure';
import CareerFramework from "./components/Career Framework/CFramework";
import Sudokuboard from "./components/quickgames/Sudokuboard/Sudoku";
import Popupquiz from "./components/quickgames/Popupquiz/Popupquiz";
import Gamelist  from "./components/quickgames/Gameslist/games";
import NewsManagement from "./components/News Management/NewsManagement";
import SuggestionManagement from "./components/Suggestion Management/SuggestionManagement";
import MediaBox from "./components/MediaUpload";
import EditThought from "./components/EditThought";
import LoginPage from "../src/components/LoginPage";
import ProfilePage from "../src/components/ProfilePage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <div className="content-wrapper">
        <Router>
          <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/suggestion" element={<Suggestion />}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/org-structure" element={<OrgStructure />}></Route>
            <Route path="/career-framework" element={<CareerFramework />}></Route>
            <Route path="/news-management" element={<NewsManagement />}></Route>
            <Route path="/suggestion-management" element={<SuggestionManagement />}></Route>
            <Route path="/quickgames/sudoku" element={<Sudokuboard />}></Route>
            <Route path="/quickgames/popupquiz" element={<Popupquiz />}></Route>  
            <Route path="/quickgames" element={<Gamelist />}></Route>
            <Route path="/uploadmedia" element={<MediaBox />}></Route>
            <Route path="/editthought" element={<EditThought />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;