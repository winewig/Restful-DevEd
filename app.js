const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middleware
app.use(bodyParser.json()); // To parse the data from frontend, otherwise only undefined
app.use(cors()); // To fix the CORS policy problem, if the frontend wants to "fetch('http://localhost:3000/posts')"

// ROUTES

// Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

/* get: Server gets that the page is called
 * post: Server shows something, mostly form
 */

app.get('/', (req, res) => {
  res.send('We are on home page');
});

// Start listening to the server
app.listen(3000);

// DB

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('DB connected');
});
