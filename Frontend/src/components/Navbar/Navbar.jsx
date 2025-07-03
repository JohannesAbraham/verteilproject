import { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import WorkIcon from '@mui/icons-material/Work';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import MessageIcon from '@mui/icons-material/Message';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    axios
    .get("http://localhost:5000/api/auth/is-admin",{withCredentials:true})
    .then(res => setIsAdmin(res.data.isAdmin))
    .catch(() => setIsAdmin(false));
  },[]);

  const handleMoreClick = () => {
    setShowMoreItems(true);
    setShowMoreButton(false); // hide "More" once clicked
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <nav
      className={`sidenav ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidenav-inner">
        <ul className="nav-items">
          <li className="nav-item">
            <a href="/">
              <HomeIcon fontSize="large" />
              {isExpanded && <span>Home</span>}
            </a>
          </li>
          {isAdmin&&(
            <li className="nav-item">
              <a href="/news-management">
                <FeedIcon fontSize="large" />
                {isExpanded && <span>Add News</span>}
              </a>
            </li>
          )}
          <li className="nav-item">
            <a href="http://localhost:5173/quickgames" target="_blank" rel="noopener noreferrer">
              <VideogameAssetIcon fontSize="large" />
              {isExpanded && <span>Games</span>}
            </a>
          </li>
          {isAdmin&&(
            <li className="nav-item">
              <a href="/quizmanager">
                <VideogameAssetIcon fontSize="large" />
                {isExpanded && <span>Game Edit</span>}
              </a>
            </li>
          )}
          <li className="nav-item">
            <a href="/suggestion">
              <MessageIcon fontSize="large" />
              {isExpanded && <span>Add Suggestion</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="/org-structure">
              <AccountTreeIcon fontSize="large" />
              {isExpanded && <span>Organization</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="/tree">
              <WorkIcon fontSize="large" />
              {isExpanded && <span>Career Framework</span>}
            </a>
          </li>
          {isAdmin&&(
            <li className="nav-item">
              <a href="/suggestion-management">
                <ChatBubbleIcon fontSize="large" />
                {isExpanded && <span>Suggestions</span>}
              </a>
            </li>
          )}          
          {isAdmin&&(
            <li className="nav-item">
              <a href="/emp-form">
                <GroupAddIcon fontSize="large" />
                {isExpanded && <span>Add User</span>}
              </a>
            </li>
          )} 
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
