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
          //proxy: 'http://haproxy:8080/',
          simple: false,
          json: true 
        };

        //Make request, send server side error if request fails
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

// Method to take result from call to OpenDota API and store in database before returning
function processApiResult(apiResponse, serverResponse, matchId) {
  if (apiResponse.error) {
    // If api responds with error match does not exist
    return serverResponse.status(400).json({
        errorText: 'No match exists with ID ' + matchId 
      });
  }
  // Fix reserved tags for DB storage
  apiResponse = fixTypeTags(apiResponse);
  // Create Match in DB
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

function fixTypeTags(match) {
  if(match.chat) {
    match.chat.forEach((chatEntry) => { chatEntry.chatType = chatEntry.type } );
  }
  if(match.objectives) {
    match.objectives.forEach((objective) => { objective.objType = objective.type });
  }
  if(match.players) {
    match.players.forEach((player) => {
      if(player.buyback_log) {
        player.buyback_log.forEach((buyback) => { buyback.bbType = buyback.type });
      }
    });
  }

  return match;

}

module.exports = router;