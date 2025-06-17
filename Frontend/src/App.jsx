import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Suggestion from "./components/Suggestion/Suggestion";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings'
import News from './components/News/News'
import OrgStructure from './components/Org Structure/OrgStructure'
import CareerFramework from "./components/Career Framework/CFramework";
import Sudokuboard from "./components/quickgames/Sudokuboard/Sudoku";
import Popupquiz from "./components/quickgames/Popupquiz/Popupquiz";
import Gamelist  from "./components/quickgames/Gameslist/games";
import NewsManagement from "./components/News Management/NewsManagement";

function App() {
  return (
    <>
    <Header />
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/suggestion" element={<Suggestion />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/org-structure" element={<OrgStructure />}></Route>
        <Route path="/career-framework" element={<CareerFramework />}></Route>
        <Route path="/quickgames/sudoku" element={<Sudokuboard />}></Route>
        <Route path="/quickgames/popupquiz" element={<Popupquiz />}></Route>
        <Route path="/quickgames" element={<Gamelist />}></Route>  
        {/* Add more routes as needed */} 
        <Route path="/news-management" element={<NewsManagement />}></Route>
      </Routes>
    </Router>
    <Footer />
    </>
  );
}


export default App;
