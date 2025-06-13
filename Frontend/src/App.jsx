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
      </Routes>
    </Router>
    <Footer />
    </>
  );
}


export default App;
