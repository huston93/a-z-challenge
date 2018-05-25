/*jshint esversion: 6 */

const express = require('express'),
      router = express.Router(),
      Match = require('../models/match.model'),
      requestPromise = require('request-promise'),
      proxy = require('../proxy-config');

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
          proxy: proxy.proxyUrl,
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
        errorText: apiResponse.error 
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

// Take each object in the Match schema that has a property called 'type' 
// and copy it to a new property as 'type' is a reserved word in Mongoose Schemas
function fixTypeTags(match) {
  if(match.chat) {
    match.chat.forEach((chatEntry) => { chatEntry.chat_type = chatEntry.type; } );
  }
  if(match.objectives) {
    match.objectives.forEach((objective) => { objective.objective_type = objective.type; });
  }
  if(match.players) {
    match.players.forEach((player) => {
      if(player.buyback_log) {
        player.buyback_log.forEach((buyback) => { buyback.log_type = buyback.type; });
      }
      if(player.max_hero_hit) {
        player.max_hero_hit.max_hit_type = player.max_hero_hit.type;
      }
      if(player.obs_left_log) {
        player.obs_left_log.forEach((obsLeft) => { obsLeft.log_type = obsLeft.type; });
      }
      if(player.obs_log) {
        player.obs_log.forEach((obs) => { obs.log_type = obs.type; });
      }
      if(player.sen_left_log) {
        player.sen_left_log.forEach((senLeft) => { senLeft.log_type = senLeft.type; });
      }
      if(player.sen_log) {
        player.sen_log.forEach((sen) => { sen.log_type = sen.type; });
      }
    });
  }

  return match;

}

module.exports = router;