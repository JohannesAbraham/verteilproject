import './Suggestion.css';
import  { useState } from 'react';


const Suggestion = () => {

    const [suggestion, setSuggestion] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!suggestion.trim()) {
      setError('Please enter your suggestion before submitting');
      return;
    }
    
    // Here you would typically send the suggestion to your backend
    console.log('Submitted suggestion:', suggestion);
    
    setSubmitted(true);
    setError('');
    setSuggestion('');
  };

  const handleChange = (e) => {
    setSuggestion(e.target.value);
    if (error) setError('');
  };

  if (submitted) {
    return (
      <div className="thank-you-message">
        <h2>Thank You!</h2>
        <p>Your suggestion has been received. We appreciate your feedback!</p>
        <button className='resubmit-button' onClick={() => setSubmitted(false)}>Submit another suggestion</button>
      </div>
    );
  }

  return (
    <div className="suggestion-container">
      <h1>Share Your Suggestions</h1>
      <p>We value your feedback! Please share your ideas, suggestions, or feedback below.</p>
      
      <form onSubmit={handleSubmit} className="suggestion-form">
        <div className="form-group">
          <label  htmlFor="suggestion">Your Suggestion:</label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={handleChange}
            placeholder="Type your suggestion here..."
            rows="6"
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <button type="submit" className="submit-button">Submit Suggestion</button>
      </form>
    </div>
    );
}

export default Suggestion;