/*
 * ==================================================================
 * This file creates a model that tells mongoose what 
 * information we want to store about Movies.
 * First we define our Schema, and then we 
 * export the model for mongoose.  
 * ==================================================================
 */


var mongoose = require('mongoose'); //Allows us to work with our database (mongoDB)


/*
 * A schema is like a blueprint for things we 
 * want to insert into the database. Here we 
 * define what information we want to store
 * about each Movie Review. We also create
 * rules about what sorts of data is allowed.
 */
var reviewSchema = new mongoose.Schema({
  body: {
  	type: String,
  	required: [true, "Missing Review Body"]
  },
  score: {
  	type: Number,
  	required: [true, "Missing Review Score"],
  	min: [0, "Score must be between 0 and 10"],
  	max: [10, "Score must be between 0 and 10"],
  }
});

/*
 * Now we define the movie Schema.
 * Each movie will contain an array of 
 * reviews, so we add that here. 
 */
var movieSchema = new mongoose.Schema({
  title: {
  	type: String,
  	required: [true, "Missing Title"]
  },
  description: {
  	type: String,
  	required: [true, "Missing Description"]
  },
  reviews: [reviewSchema]
});


/*
 * Now we take our movie schema and turn
 * it into a model for mongoose to use.
 * We use module.exports so we can require() 
 * this model into other files. 
 */
module.exports = mongoose.model('Movie', movieSchema);
