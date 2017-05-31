// Copyright (C) 2017 Keval Sanghavi (keval.sanghavi@gmail.com), Vivek Viradia (vivek.viradia@gmail.com)

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to the database.
mongoose.connect(config.database);

// On successful connection to the database.
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
});

// On error while connecting to the database.
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const login = require('./routes/login');
const usersinfo = require('./routes/usersinfo');
const schools = require('./routes/schools');

// Port number.
// const port = 3000;
const port = process.env.PORT || 8080;

// CORS middleware.
app.use(cors());

// Set static folder.
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware.
app.use(bodyParser.json());

// Passport middleware.
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/login', login);
app.use('/usersinfo', usersinfo);
app.use('/schools', schools);

// Index route.
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server.
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
