/*jshint esversion: 6 */

const express = require('express'),
router = express.Router(),
//mongoose = require('../../devDB'),
Match = require('../models/match.model');

// Define route for get requests
router.get('/', (req, res) => {
  Match.find((err, matches) => {
    if (err) {
      res.send(err);
    }
    res.json(matches);
  });
});

module.exports = router;