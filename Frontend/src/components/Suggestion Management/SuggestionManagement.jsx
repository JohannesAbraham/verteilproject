import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import './SuggestionManagement.css';

// Sample suggestions data
const suggestions = [
  {
    id: 1,
    subject: 'Improve Dashboard Performance',
    content: 'The dashboard takes too long to load when there are many widgets. We should implement lazy loading for widgets that are not immediately visible.'
  },
  {
    id: 2,
    subject: 'Dark Mode Implementation',
    content: 'Many users have requested a dark mode option. This would be especially useful for nighttime usage and could reduce eye strain.'
  },
  {
    id: 3,
    subject: 'Mobile App Navigation',
    content: 'The current mobile navigation is not intuitive. Suggest implementing a bottom navigation bar for easier access to main sections.'
  },
  {
    id: 4,
    subject: 'Documentation Improvements',
    content: 'Our API documentation needs more examples and better organization. Could we create interactive examples like other platforms have?'
  },
  
];

const Suggestion = ({ subject, content }) => {
  return (
    <Grid2 xs={12} sm={6} md={4} lg={3} className="suggestion-grid-item">
      <Card className="suggestion-card">
        <CardContent className="card-content">
          <Typography 
            variant="h5" 
            component="h2" 
            className="suggestion-subject"
          >
            {subject}
          </Typography>
          <Typography 
            variant="body1" 
            className="suggestion-content"
          >
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
};

const SuggestionManagement = () => {
  return (
    <div className="suggestion-management-container">
      <Typography 
        sx={{marginBottom:"32px"}}
        variant="h4" 
        component="h1" 
        className="suggestion-management-title"
      >
        User Suggestions
      </Typography>
      
      <Grid2 container spacing={3} className="suggestions-grid">
        {suggestions.map((suggestion) => (
          <Suggestion 
            key={suggestion.id}
            subject={suggestion.subject}
            content={suggestion.content}
          />
        ))}
      </Grid2>
    </div>
  );
};

export default SuggestionManagement;