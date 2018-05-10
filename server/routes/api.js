/*jshint esversion: 6 */

const express = require('express'),
      router = express.Router(),
      matchRoutes = require('./matches');

// Middleware for all requests
router.use((req, res, next) => {
  console.log('Shit going down');
  // Proceed with remaining routes
  next(); 
});

// Default Route
router.get('/', (req, res) => {
  res.send('Oh shit you made it');
});

// Define match routes
router.use('/matches', matchRoutes);

module.exports = router;