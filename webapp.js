var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// Create Express web app
var app = express();

// Use morgan for HTTP request logging in dev and prod
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming form-encoded HTTP bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// For Trello webhook
app.use(bodyParser.json());

// Configure application routes
var routes = require('./controllers/router');
var router = express.Router();

routes(router);
app.use(router);

// Export Express app
module.exports = app;