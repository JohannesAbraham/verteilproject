import './Suggestion.css';
import { useState } from 'react';
import axios from 'axios';

const Suggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [subject, setSubject] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject.trim() || !suggestion.trim()) {
      setError('Please fill in both subject and suggestion fields');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/suggestions', {
        title: subject,
        content: suggestion
      });
      
      console.log('Suggestion submitted:', response.data);
      setSubmitted(true);
      setError('');
      setSuggestion('');
      setSubject('');
    } catch (err) {
      console.error('Error submitting suggestion:', err);
      setError('Failed to submit suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
    if (error) setError('');
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    if (error) setError('');
  };

  if (submitted) {
    return (
      <div className="thank-you-message">
        <h2>Thank You!</h2>
        <p>Your suggestion has been received. We appreciate your feedback!</p>
        <button className='resubmit-button' onClick={() => setSubmitted(false)}>
          Submit another suggestion
        </button>
      </div>
    );
  }

  return (
    <div className="suggestion-container">
      <h1>Share Your Suggestions</h1>
      <p>We value your feedback! Please share your ideas, suggestions, or feedback below.</p>
      
      <form onSubmit={handleSubmit} className="suggestion-form">
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            className='form-input'
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="Enter subject..."
          />
          
          <label htmlFor="suggestion">Your Suggestion:</label>
          <textarea
            className='form-textarea'
            id="suggestion"
            value={suggestion}
            onChange={handleSuggestionChange}
            placeholder="Type your suggestion here..."
            rows="6"
          />
          
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Suggestion'}
        </button>
      </form>
    </div>
  );
}

export default Suggestion;