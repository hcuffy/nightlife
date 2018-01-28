const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nightlife');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json('*/*'));
app.use(logger('combined'));

app.use(session({secret: 'nightlife', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('*', function(req, res, next) {
  res.locals.user = req.user || null;
  res.locals.error = null;
  next();
});

const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Express server running on port', port)
});
