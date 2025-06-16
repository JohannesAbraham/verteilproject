import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newsManagement.css';

const NewsManagement = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet consectetur',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
      category: 'company',
      imageFile: null,
      previewImage: 'placeholder.png', // For existing articles
      date: 'XX:XX on Feb 29th',
      type: 'primary'
    }
  ]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        previewImage: previewUrl
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would upload the file here
    const newArticle = {
      ...formData,
      id: isEditing ? currentArticle.id : Date.now(),
      date: new Date().toLocaleString(),
      // For demo purposes, we'll just use the preview URL
      previewImage: formData.previewImage || 'placeholder.png'
    };

    if (isEditing) {
      setArticles(articles.map(article => 
        article.id === currentArticle.id ? newArticle : article
      ));
    } else {
      setArticles([...articles, newArticle]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'company',
      imageFile: null,
      previewImage: null,
      type: 'primary'
    });
    setIsEditing(false);
    setCurrentArticle(null);
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      imageFile: null,
      previewImage: article.previewImage,
      type: article.type
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="news-management-container">
      <header className="management-header">
        <h1>News Management</h1>
        <button className="back-button" onClick={() => navigate('/news')}>
          Back to News
        </button>
      </header>

      <div className="management-content">
        <form className="article-form" onSubmit={handleSubmit}>
          <h2>{isEditing ? 'Edit Article' : 'Add New Article'}</h2>
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
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

            <div className="form-group">
              <label htmlFor="type">Article Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="tertiary">Tertiary</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageFile">Article Image</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.previewImage && (
              <div className="image-preview">
                <img 
                  src={formData.previewImage} 
                  alt="Preview" 
                  className="preview-image"
                />
                <p className="file-info">
                  {formData.imageFile ? formData.imageFile.name : 'Current image'}
                </p>
              </div>
            )}
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
          <h2>Current Articles</h2>
          {articles.length === 0 ? (
            <p className="no-articles">No articles available</p>
          ) : (
            <ul>
              {articles.map(article => (
                <li key={article.id} className="article-item">
                  <div className="article-preview">
                    <img 
                      src="image.png"
                      alt="Article preview" 
                      className="article-thumbnail"
                    />
                    <div className="article-info">
                      <h3>{article.title}</h3>
                      <p className="article-meta">
                        {article.category === 'company' ? 'Company' : 'Airline'} News • {article.type} • {article.date}
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
                      onClick={() => handleDelete(article.id)}
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