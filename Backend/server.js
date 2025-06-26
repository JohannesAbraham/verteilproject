require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const newsRoutes = require('./routes/NewsRoutes');
const suggestionRoutes = require('./routes/SuggestionRoutes');
const mediaBoxRoutes = require('./routes/MediaBoxRoutes');
const thoughtWordRoutes = require('./routes/ThoughtWordRoutes');
const profileRoutes = require('./routes/ProfileRoutes')

const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT ; 
connectDB();

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/media', mediaBoxRoutes);
app.use('/api/thoughtword', thoughtWordRoutes);
app.use("/api/auth", profileRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));