// Server.js

// Main Setup 
// =====================================================================================

// Require packages
var express = require('express');                       // call express
var app = express();                                    // define app using express
var bodyParser = require('body-parser');  
var mongoose = require('mongoose');                     // mongoose to interface with mongoDB

// Require Models
var Match = require('./server/models/match.model');

// configure app to use bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;                    // set the port

mongoose.connect('mongodb://localhost:27017/a-z');      // connect to mongoDB database

// Routes for API
// =====================================================================================
var router = express.Router();                          // get instance of express Router

// Middleware for all requests
router.use(function(req, res, next) {
  console.log('Shit going down');
  // Proceed with remaining routes
  next(); 
})

// Default test route
router.get('/', function(req, res) {
  res.json({ message: 'Default Route Functioning'});
});

//Define route for post requests
router.route('/matches').post(function(req, res) {

  // Retrieve match ID to add
  var matchId = req.body.matchId;

})

// Register Routes - all routes will be prefixed with '/api'
app.use('/api', router);

// Start Server
// =====================================================================================
app.listen(port);
console.log('Hit me up over on port ' + port);