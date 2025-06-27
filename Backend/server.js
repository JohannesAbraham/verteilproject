require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios')
const quiz = require('./routes/Quiz');

const newsRoutes = require('./routes/NewsRoutes');
const suggestionRoutes = require('./routes/SuggestionRoutes');
const mediaBoxRoutes = require('./routes/MediaBoxRoutes');
const thoughtWordRoutes = require('./routes/ThoughtWordRoutes');
const profileRoutes = require('./routes/ProfileRoutes')
const treeRoutes = require('./routes/TreeRoutes')
const quizRoutes = require('./routes/Quiz');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT ;
const url = "http://www.verteil.com/newsroom" 
connectDB();

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/media', mediaBoxRoutes);
app.use('/api/thoughtword', thoughtWordRoutes);
app.use("/api/auth", profileRoutes);
app.use("/api/tree",treeRoutes);
app.use('/api/quiz', quizRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// TODO : remove this get request
app.get("/scrape", async (req, res) => {
  const url = "http://www.verteil.com/newsroom" 
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let data = [];
    
  
    $("a").each((index, element) => {

      data.push({
        text: $(element).text(),
        href: $(element).attr("href"),
      });
    });
    news = data.slice(10,-1).find((data)=> { 
      return data.href!=undefined;
     })
     
     newsIndex = data.indexOf(news)
     res.json(data.slice(newsIndex,newsIndex+6))
    
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));