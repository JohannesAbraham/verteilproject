import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './SuggestionManagement.css';

const Suggestion = ({ suggestion, onDelete }) => {
  return (
    <Grid2 xs={12} sm={6} md={4} lg={3} className="suggestion-grid-item">
      <Card className="suggestion-card">
        <CardContent className="card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              component="h2" 
              className="suggestion-subject"
            >
              {suggestion.title}
            </Typography>
            <IconButton 
              aria-label="delete" 
              onClick={() => onDelete(suggestion._id)}
              style={{ color: 'red' }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Typography 
            variant="body1" 
            className="suggestion-content"
          >
            {suggestion.content}
          </Typography>
          <Typography 
            variant="body1" 
            className="suggestion-content"
          >
            {suggestion.empId}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(suggestion.publishDate).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
};

const SuggestionManagement = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/suggestions');
      setSuggestions(response.data);
      console.log(response.data)
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/suggestions/${id}`);
    // Remove the deleted suggestion from state
    setSuggestions(suggestions.filter(suggestion => suggestion._id !== id));
  } catch (err) {
    console.error('Error deleting suggestion:', err);
    setError(err.message);
  }
};

  if (loading) {
    return (
      <div className="suggestion-management-container">
        <Typography variant="h4" component="h1" className="suggestion-management-title">
          Loading suggestions...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="suggestion-management-container">
        <Typography variant="h4" component="h1" className="suggestion-management-title">
          Error loading suggestions
        </Typography>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    
        <div className="suggestion-management-container">
          <Typography 
            sx={{ marginBottom: "32px" }}
            variant="h4" 
            component="h1" 
            className="suggestion-management-title"
          >
            User Suggestions
          </Typography>
          
          <Grid2 container spacing={3} className="suggestions-grid">
            {suggestions.length!=0? 
              suggestions.map((suggestion) => (
                <Suggestion 
                  key={suggestion._id}
                  suggestion={suggestion}
                  onDelete={handleDelete}
                />
              ))
            :
            <Typography>
              No suggestions right now!
            </Typography>
            }
          </Grid2>
        </div>
    
  );
};

export default SuggestionManagement;