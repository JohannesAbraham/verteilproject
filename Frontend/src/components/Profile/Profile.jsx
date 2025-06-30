// src/components/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: 'Hannah Varghese',
    id: 'EMP123456',
    birthday: '2002-05-28',
    joiningDate: '2024-01-15',
    role: 'Frontend Developer',
    profilePic: 'https://via.placeholder.com/150',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <img src={user.profilePic} alt="Profile" className="profile-image" />
        
        {editMode ? (
          <>
            <input name="name" value={user.name} onChange={handleChange} />
            <input name="id" value={user.id} onChange={handleChange} />
            <input type="date" name="birthday" value={user.birthday} onChange={handleChange} />
            <input type="date" name="joiningDate" value={user.joiningDate} onChange={handleChange} />
            <input name="role" value={user.role} onChange={handleChange} />
          </>
        ) : (
          <>
            <h2 className="profile-name">{user.name}</h2>
            <p><strong>Employee ID:</strong> {user.id}</p>
            <p><strong>Birthday:</strong> {user.birthday}</p>
            <p><strong>Date of Joining:</strong> {user.joiningDate}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        )}

        <button className="edit-button" onClick={toggleEdit}>
          {editMode ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
