import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './styling/profile.css';
import Header from "./Header"

const Profile = () => {
  // Sample data
  const profileData = {
    name: "John Doe",
    designation: "Software Developer",
    age: 28,
    joinDate: "January 15, 2020",
    gamePoints: 1250,
    teamMembers: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg"
    ],
    hoursWorked: [
      { day: 'Mon', hours: 8 },
      { day: 'Tue', hours: 7.5 },
      { day: 'Wed', hours: 8.5 },
      { day: 'Thu', hours: 7 },
      { day: 'Fri', hours: 6.5 },
      { day: 'Sat', hours: 1 },
      { day: 'Sun', hours: 2 }
    ]
  };

  return (
    <>
    <Header></Header>
    <div className="page-container">
      {/* Main Profile Section */}
      <div className="profile-container">
        <div className="profile-content">
          {/* Profile Photo */}
          <div className="profile-photo-container">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Profile" 
              className="profile-photo"
            />
          </div>
          
          {/* Profile Details */}
          <div className="profile-details">
            <h2 className="name">{profileData.name}</h2>
            <p className="detail"><strong>Designation:</strong> {profileData.designation}</p>
            <p className="detail"><strong>Age:</strong> {profileData.age}</p>
            <p className="detail"><strong>Joined:</strong> {profileData.joinDate}</p>
          </div>
        </div>
        
        {/* Onboarding Button */}
        <button className="onboarding-button">
          Complete Onboarding
        </button>
      </div>

      {/* Lower Sections */}
      <div className="lower-sections">
        {/* Hours Worked Section */}
        <div className="hours-section">
          <h2 className="section-title">Hours Worked</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={profileData.hoursWorked}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#3F3F3F" />
                <XAxis dataKey="day" stroke="#3F3F3F" />
                <YAxis stroke="#3F3F3F" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFF8F0',
                    borderColor: '#80A23F',
                    color: '#3F3F3F'
                  }}
                />
                <Bar 
                  dataKey="hours" 
                  fill="#3F3F3F" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sections */}
        <div className="right-sections">
          {/* Team Members */}
          <div className="team-section">
            <h2 className="section-title">Team Members</h2>
            <div className="team-photos">
              {profileData.teamMembers.map((member, index) => (
                <img 
                  key={index}
                  src={member}
                  alt={`Team member ${index + 1}`}
                  className="team-photo"
                />
              ))}
            </div>
          </div>

          {/* Game Points */}
          <div className="game-points-section">
            <h2 className="section-title">Game Points: {profileData.gamePoints}</h2>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;