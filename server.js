const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDb } = require('./config/db');
const apiRoutes = require('./routes/api');
const healthRoutes = require('./routes/health');
const redirectRoutes = require('./routes/redirect');
const  { rateLimit } =require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' ||'https://url-app-nine.vercel.app'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
});
app.use(limiter);
// Routes
app.use('/', redirectRoutes);
app.use('/', healthRoutes);
app.use('/api', apiRoutes);
// Redirect last so it doesn't capture other routes

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`TinyLink server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

  