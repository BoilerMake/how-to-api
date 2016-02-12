/*
 * ==============================================================================
 * This file creates a model that tells mongoose what 
 * information we want to store about Movies.
 * First we define our Schema, and then we 
 * export the model for mongoose.  
 * ==============================================================================
 */


var mongoose = require('mongoose'); //Allows us to work with our database (mongoDB)

/*
 * A schema is like a blueprint for things we 
 * want to insert into the database. Here we 
 * define what information we want to store
 * about each Movie.  
 */
var movieSchema = new mongoose.Schema({
  title: String,
  description: String
});

/*
 * Now we take our schema and turn
 * it into a model for mongoose to use.
 * We use module.exports so we can require() 
 * this model into other files. 
 */
module.exports = mongoose.model('Movie', movieSchema);
