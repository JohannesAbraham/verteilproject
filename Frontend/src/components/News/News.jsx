import React, { useState, useEffect } from 'react';
import './News.css'; // We'll create this CSS file next
import { Typography } from '@mui/material';
import axios from 'axios';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchNews = async () => {
      try {
        
        axios.get("http://localhost:5000/scrape")
        .then((res) => {
          setArticles(res.data)
          setLoading(false)
          console.log("get request fulfilled")
        })
        .catch((err)=>{
          console.log(err)
        })
        
      }
      catch (err){
        console.log(err)
      }
    }
    fetchNews();
  }, []);

  console.log(articles)
  

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="news-page card">
      <Typography variant="h3">News:</Typography>

      <div className="news-container">
        {articles.map((article) => {
          
          console.log(article)
          return (
          <article key={article.text} className="news-article">
            
            <div className="article-content">
              <Typography variant='h5' sx={{color:'white'}}>{article.text}</Typography>
              <a target='_blank' href={article.href} className="read-more">Read more</a>
            </div>
          </article>
        )})}
      </div>

      
    </div>
  );
};

export default NewsPage;