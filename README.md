# Verteil Project

A comprehensive full-stack application for organizational management, employee profiling, career framework visualization, and internal communication.

### Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

### Overview

The Verteil Project is a web-based platform designed to:
- Manage organizational structures and hierarchies
- Maintain employee profiles and information
- Visualize career development frameworks
- Share company news and announcements
- Manage holidays and time-off requests
- Facilitate employee suggestions and feedback
- Create and manage quiz games for employee engagement
- Handle media and file uploads

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **File Storage**: Local file system (uploads directory)

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS3
- **Graph Visualization**: React Flow (for career framework)
- **Linting**: ESLint

## Prerequisites

Before running the project, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or cloud instance)

## Project Structure

```
verteilproject/
├── Backend/                          # Node.js/Express server
│   ├── config/
│   │   └── db.js                    # Database configuration
│   ├── models/                      # MongoDB schemas
│   │   ├── Admin.js
│   │   ├── Employee.js
│   │   ├── Holiday.js
│   │   ├── MediaBox.js
│   │   ├── News.js
│   │   ├── OrgNode.js
│   │   ├── QuizQuestion.js
│   │   ├── Suggestion.js
│   │   ├── ThoughtWord.js
│   │   ├── Tree.js
│   │   └── User.js
│   ├── routes/                      # API endpoints
│   │   ├── EmpRoutes.js
│   │   ├── Holidays.js
│   │   ├── MediaBoxRoutes.js
│   │   ├── NewsRoutes.js
│   │   ├── OrgStructureRoutes.js
│   │   ├── ProfileRoutes.js
│   │   ├── Quiz.js
│   │   ├── SuggestionRoutes.js
│   │   ├── ThoughtWordRoutes.js
│   │   └── TreeRoutes.js
│   ├── uploads/                     # User-uploaded files
│   ├── server.js                    # Entry point
│   ├── leaderboard.json             # Quiz leaderboard data
│   └── package.json
├── Frontend/                         # React/Vite application
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── Career Framework/    # Career development visualization
│   │   │   ├── Org Structure/       # Organizational hierarchy
│   │   │   ├── Profile/             # Employee profiles
│   │   │   ├── Home/                # Dashboard
│   │   │   ├── News Management/     # News posting interface
│   │   │   ├── Suggestion/          # Suggestion submission
│   │   │   ├── quickgames/          # Quiz and game components
│   │   │   └── ...other components
│   │   ├── App.jsx                  # Main application component
│   │   ├── index.css                # Global styles
│   │   ├── main.jsx                 # React entry point
│   ├── public/                       # Static assets
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # ESLint configuration
│   ├── package.json
│   └── index.html                   # HTML template
└── package.json                      # Root package configuration
```

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd verteilproject
```

### 2. Install Backend Dependencies
```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../Frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the Backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/verteil
NODE_ENV=development
```

Adjust the values according to your environment setup.

## Usage

### Start the Backend Server
```bash
cd Backend
npm start
```
The server will run on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd Frontend
npm run dev
```
The frontend will typically run on `http://localhost:5173`

### Build for Production (Frontend)
```bash
cd Frontend
npm run build
```

## Features

### Organization Management
- View and manage organizational structure
- Create and edit organizational hierarchy
- Visualize reporting relationships

### Employee Management
- Create and maintain employee profiles
- Store employee information and contact details
- Upload employee photos/media

### Career Framework
- Visual career development paths
- Job descriptions and role information
- Interactive tree-based framework visualization

### News Management
- Post company announcements and news
- Manage news content
- Distribute information across the organization

### Holidays & Time Off
- Submit and manage holiday requests
- View holiday calendar
- Track team availability

### Suggestions & Feedback
- Employee suggestion system
- Feedback collection
- Idea management

### Quick Games
- Pop quizzes for employee engagement
- Sudoku games
- Quiz leaderboard tracking
- Admin panel for quiz management

### Media Management
- Upload and manage media files
- Organize media content

### Thought of the Day
- Daily thought sharing
- Employee engagement feature

## API Endpoints

The backend provides the following route categories:
- `/api/employees` - Employee management
- `/api/holidays` - Holiday management
- `/api/news` - News articles
- `/api/org-structure` - Organization structure
- `/api/profile` - User profiles
- `/api/quiz` - Quiz management
- `/api/suggestions` - Suggestion system
- `/api/media` - Media management
- `/api/thoughts` - Thought of the day
- `/api/tree` - Career framework tree

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For support and questions, please contact the development team.

---
