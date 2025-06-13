require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const newsRoutes = require('./routes/NewsRoutes');
const suggestionRoutes = require('./routes/SuggestionRoutes');

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/suggestions', suggestionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT ; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));