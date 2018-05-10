/*jshint esversion: 6 */
const mongoose = require('mongoose');                         // mongoose to interface with mongoDB
      mongoose.connect('mongodb://localhost:27017/a-z');      // connect to mongoDB database

module.exports = mongoose;