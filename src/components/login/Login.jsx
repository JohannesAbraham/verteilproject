import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with ${username}`);
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <h1>VERTEIL</h1>
        <p>Quote representing company values, with an important image for the company</p>
      </div>
      <div className="right-panel">
        <div className="login-card">
          <h2>VERTEIL</h2>
          <form onSubmit={handleSubmit}>
            <label>USERNAME:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <label>PASSWORD:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
