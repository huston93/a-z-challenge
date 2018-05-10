/*jshint esversion: 6 */

const express = require('express'),
      router = express.Router(),
      Match = require('../models/match.model'),
      requestPromise = require('request-promise');

const openDotaUrl = 'https://api.opendota.com/api/matches/';

// Define route for get requests
router.route('/').get((req, res) => {
  
  Match.find((error, matches) => {
    
    // Send failed response if problem reading db
    if (error) { return res.status(500).send('Error occurred while reading DB'); }
    
    // Otherwise return json object containing results
    res.json(matches);
  });
});

// Define route for getting individual match by ID
router.route('/:match_id').get((req, res) => {

  Match.findOne({ match_id: req.params.match_id }, (error, match) => {

    // Send failed response if problem reading db
    if (error) { return res.status(500).send('Error occurred while reading DB'); }

    // If match found, return it otherwise attempt to fetch from openDota API
    if (match) {
      res.json(match);
    } else {
        // Set up request options
        const options = {
          uri: openDotaUrl + req.params.match_id,
          proxy: 'http://haproxy:8080/',
          simple: false,
          json: true 
        };

        requestPromise.get(options)
        .then((response) => {
          Match.create([response], (error, match) => {
            if (error) {     
              return {
                errorText: 'Error occurred while reading DB',
                errorMessage: error 
              };
            }
            res.json(match);
          });
        })
        .catch((error) => {
          return {
            errorText: 'Error occurred while calling OpenDota api',
            errorMessage: error
          };
        });
    }
  });
});

module.exports = router;