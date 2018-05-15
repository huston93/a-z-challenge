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
    if (error) { 
      return res.status(500).json({
        errorText: 'Error occurred while reading DB',
        errorMessage: error
      });
    }
    
    // Otherwise return json object containing results
    res.json(matches);
  });
});

// Define route for getting individual match by ID
router.route('/:match_id').get((req, res) => {

  Match.findOne({ match_id: req.params.match_id }, (error, match) => {

    // Send failed response if problem reading db
    if (error) { 
      return res.status(500).json({
        errorText: 'Error occurred while reading DB',
        errorMessage: error
      });
    }

    // If match found, return it otherwise attempt to fetch from openDota API
    if (match) {
      res.json(match);
    } else {

        // Set up request options
        const options = {
          uri: openDotaUrl + req.params.match_id,
//          proxy: 'http://haproxy:8080/',
          simple: false,
          json: true 
        };

        requestPromise.get(options)
        .then((response) => processApiResult(response, res, req.params.match_id))
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            errorText: 'Error occurred while calling OpenDota api to retrieve match ' + req.params.match_id,
            errorMessage: error
          });
        });
    }
  });
});

function processApiResult(apiResponse, serverResponse, matchId) {
  if (apiResponse.error) {
    return serverResponse.status(400).json({
        errorText: 'No match exists with ID ' + matchId 
      });
  }
  Match.create([apiResponse], (error, match) => {
    if (error) {     
      return serverResponse.status(500).json({
        errorText: 'Error occurred while creating entry in DB for Match ' + apiResponse[match_id],
        errorMessage: error
      });
    }
    serverResponse.json(match);
  });
}

module.exports = router;