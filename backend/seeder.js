/*
 * ===========================================================================
 * This program will delete your mongoDB database and remake it from scratch. 
 * If you accidentally mess up your database and want to reset it, run this. 
 * You can run this by typing "node seeder.js"
 * ===========================================================================
 */

var mongoose = require('mongoose'); //Allows us to work with our database (mongoDB)
var env = require('node-env-file'); //Allows us to set enviornment variables
var Movie = require('./models/movie');

env('.env'); //Load enviornment variables from our .env file
mongoose.connect(process.env.MONGODB); //Connect to our database using the address we mentioned in .env


console.log("Seeding database...");

//Drop all existing documents
var removeCounter = 0;
Movie.find({},function(err,movies){
	movies.forEach(function(movie){
		movie.remove(function(err,removed){
			removeCounter++;
		});
	});
});


//Load sample data to insert into the database
var movieList = require('./seederData.js');

//Add our fake data into our database collection
var insertCounter = 0;
movieList.forEach(function(movieData) {
	var movie = new Movie(movieData);
	movie.save(function(err){
		if(err)
			console.log(err);
	});
	insertCounter++;
});

//Wait a few seconds, then exit
setTimeout(function() {
  console.log("Deleted "+removeCounter+" documents, added "+insertCounter+"!\nSeeding Finished!");
  process.exit();
}, 3000);
