import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsManagement.css';
import { Typography } from '@mui/material';
import axios from 'axios';

const NewsManagement = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'company',
    imageFile: null,
    previewImage: null,
    type: 'primary'
  });

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news');
        setArticles(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.error('Error fetching articles:', err);
      }
    };
    
    fetchArticles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.title.trim() || !formData.content.trim()) {
    setError('Title and content are required');
    return;
  }

  try {
    const formDataToSend = {
     title:formData.title,
     content:formData.content,
     category:formData.category,
    };
    

    console.log(formDataToSend)
    let response;
    if (isEditing) {
      response = await axios.put(
        `http://localhost:5000/api/news/${currentArticle._id}`,
        formDataToSend
      );
    } else {
      response = await axios.post('http://localhost:5000/api/news', formDataToSend);
    }

    // Update state and reset form
    if (isEditing) {
      setArticles(articles.map(article => 
        article._id === currentArticle._id ? response.data : article
      ));
    } else {
      setArticles([response.data, ...articles]);
    }
    
    resetForm();
  } catch (err) {
    console.error('Submission error:', err);
    setError(err.response?.data?.message || 'Error saving article');
  }
};


  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'company',
      previewImage: null,
      type: 'primary'
    });
    setIsEditing(false);
    setCurrentArticle(null);
    setError(null);
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      imageFile: null,
      previewImage: article.imageUrl || 'placeholder.png',
      type: article.type || 'primary'
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      setArticles(articles.filter(article => article._id !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
      setError(err.response?.data?.message || 'Error deleting article');
    }
  };

  if (isLoading) {
    return <div className="news-management-container">Loading...</div>;
  }

  console.log(articles)

  return (
    <div className="news-management-container">
      {error && <div className="error-message">{error}</div>}

      <div className="management-content">
        <form className="article-form" onSubmit={handleSubmit}>
          <Typography variant='h6'>{isEditing ? 'Edit Article:' : 'Add New Article:'}</Typography>
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className='field title'
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className='field content'
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="company">Company News</option>
                <option value="airline">Airline News</option>
              </select>
            </div>
          </div>


          <div className="form-actions">
            <button type="submit" className="submit-button">
              {isEditing ? 'Update Article' : 'Add Article'}
            </button>
            {isEditing && (
              <button type="button" className="cancel-button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="articles-list">
          <Typography variant='h4'>Current Articles:</Typography>
          {articles.length === 0 ? (
            <p className="no-articles">No articles available!</p>
          ) : (
            <ul>
              {articles.map(article => (
                <li key={article._id} className="article-item">
                  <div className="article-preview">
                    
                    <div className="article-info">
                      <Typography variant='h5'>{article.title}</Typography>
                      <p className="article-meta">
                        {article.category === 'company' ? 'Company' : 'Airline'} News • {article.type} • {new Date(article.publishDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="article-actions">
                    <button 
                      className="edit-button"
                      onClick={() => handleEdit(article)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDelete(article._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;