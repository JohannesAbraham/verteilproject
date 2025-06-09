import React, { useState } from 'react';
import './settings.css';

const Settings = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    phone: '+1 (555) 123-4567',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    theme: 'light'
  });

  // Form state
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({...userData});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggles
  const handleNotificationToggle = (type) => {
    setTempData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    setUserData(tempData);
    setEditMode(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setTempData({...userData});
    setEditMode(false);
  };

  return (
    <>
    <div className="settings-container">
      <div className="settings-header">
        <h1>Account Settings</h1>
        {!editMode ? (
          <button 
            className="edit-button"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="action-buttons">
            <button 
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className="save-button"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="settings-content">
        {/* Profile Section */}
        <div className="settings-section">
          <h2>Profile Information</h2>
          <div className="settings-card">
            <div className="form-group">
              <label>Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={tempData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{userData.name}</p>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>Department</label>
              {editMode ? (
                <select
                  name="department"
                  value={tempData.department}
                  onChange={handleInputChange}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              ) : (
                <p>{userData.department}</p>
              )}
            </div>

            <div className="form-group">
              <label>Position</label>
              {editMode ? (
                <input
                  type="text"
                  name="position"
                  value={tempData.position}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{userData.position}</p>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              {editMode ? (
                <input
                  type="tel"
                  name="phone"
                  value={tempData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="settings-section">
          <h2>Notification Preferences</h2>
          <div className="settings-card">
            <div className="toggle-group">
              <label>Email Notifications</label>
              <div 
                className={`toggle-switch ${tempData.notifications.email ? 'active' : ''}`}
                onClick={() => handleNotificationToggle('email')}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div className="toggle-group">
              <label>Push Notifications</label>
              <div 
                className={`toggle-switch ${tempData.notifications.push ? 'active' : ''}`}
                onClick={() => handleNotificationToggle('push')}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div className="toggle-group">
              <label>SMS Notifications</label>
              <div 
                className={`toggle-switch ${tempData.notifications.sms ? 'active' : ''}`}
                onClick={() => handleNotificationToggle('sms')}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="settings-section">
          <h2>Display Preferences</h2>
          <div className="settings-card">
            <div className="form-group">
              <label>Theme</label>
              {editMode ? (
                <div className="theme-options">
                  <label className={`theme-option ${tempData.theme === 'light' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={tempData.theme === 'light'}
                      onChange={handleInputChange}
                    />
                    Light
                  </label>
                  <label className={`theme-option ${tempData.theme === 'dark' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={tempData.theme === 'dark'}
                      onChange={handleInputChange}
                    />
                    Dark
                  </label>
                  <label className={`theme-option ${tempData.theme === 'system' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      checked={tempData.theme === 'system'}
                      onChange={handleInputChange}
                    />
                    System Default
                  </label>
                </div>
              ) : (
                <p>{userData.theme.charAt(0).toUpperCase() + userData.theme.slice(1)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="settings-section">
          <h2>Account Actions</h2>
          <div className="settings-card danger-zone">
            <button className="change-password-button">
              Change Password
            </button>
            <button className="log-out-button">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Settings;