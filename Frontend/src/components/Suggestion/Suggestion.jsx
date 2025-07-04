import './Suggestion.css';
import { useState } from 'react';
import axios from 'axios';

const Suggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [category, setCategory] = useState('General');
  const [empId, setEmpId] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
    if (!category.trim() || !suggestion.trim() || !empId.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    try {

      // TODO: CHECK IF EMPLOYEE ID IS VALID


      

      setIsLoading(true);
      const request = {
        category: category,
        content: suggestion,
        empId: empId
      }
      console.log(request)
      const response = await axios.post('http://localhost:5000/api/suggestions', request);
      
      console.log('Suggestion submitted:', response.data);
      setSubmitted(true);
      setError('');
      setSuggestion('');
      setCategory('General');
      setEmpId('');

    } catch (err) {
      console.error('Error submitting suggestion:', err);
      setError('Failed to submit suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.currentTarget.value)
    if (error) setError('');
  }
  const handleSuggestionChange = (e) => {
    setSuggestion(e.currentTarget.value);
    if (error) setError('');
  };

  const handleEmpIdChange = (e) => {
    setEmpId(e.currentTarget.value)
    if (error) setError('')
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
      <p>We value your suggestions! Please share your ideas and suggestions below.</p>
      
      <form onSubmit={handleSubmit} className="suggestion-form">
        <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="General">General</option>
                <option value="Product">Product</option>
                <option value="Tech and Tools">Tech and Tools</option>
                <option value="Training">Training</option>
                <option value="Finance">Finance</option>
                <option value="Policies">Policies</option>
                <option value="HR and People's Operations">HR and People Operations</option>
              </select>
          
          <label  htmlFor="suggestion">Your Suggestion:</label>
          <textarea
            className='form-textarea'
            id="suggestion"
            value={suggestion}
            onChange={handleSuggestionChange}
            placeholder="Type your suggestion here..."
            rows="6"
          />

          <input
            className='form-input'
            id="employee-id"
            value={empId}
            onChange={handleEmpIdChange}
            placeholder="Enter your employee ID..."
          />
          
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <button 
          type="submit" 
          className="submit-button bg-lgreen"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Suggestion'}
        </button>
      </form>
    </div>
  );
}

export default Suggestion;