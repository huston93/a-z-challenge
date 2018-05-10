/*jshint esversion: 6 */
// Server.js

// Main Setup 
// =====================================================================================

// Require packages
const express = require('express'),                       // call express
      app = express(),                                    // define app using express
      bodyParser = require('body-parser'),
      path = require('path'),                             // module for working with file directory paths
      mongoose = require('./devDB'),
      cors = require('cors');

      apiRoute = require('./server/routes/api');          // route for api

// configure app to use bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure app to use cors
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

var port = process.env.PORT || 8080;                    // set the port

// Routes for API
// =====================================================================================

// Register Routes - all routes will be prefixed with '/api'
app.use('/api', apiRoute);

// All other requests forward to Angular app by default
app.get('*', (req, res) => {
  res.render(path.join(__dirname, 'dist/index.html'));
});

// Start Server
// =====================================================================================
app.listen(port);
console.log('Hit me up over on port ' + port);