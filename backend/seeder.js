/*
 * ==============================================================================
 * This program will delete your mongoDB database and remake it from scratch. 
 * If you accidentally mess up your database and want to reset it, run this. 
 * You can run this by typing "node seeder.js"
 * ==============================================================================
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
var movieList = [
	{
		title: "Hello World",
		description: "A romantic love story about two programmers who learn that life isn't just about coding",
		reviews: [ 
			{
			score: 10,
			body: "Incredible. Easily the best movie I have ever seen in my whole life! I loved the part with the evil robot."
			}, 
			{
			score: 7,
			body: "Pretty great. Really touching movie. Not enough coding though."
			},
			{
			score: 6,
			body: "I've seen better."
			}
		]
	},
	{
		title: "Breaking Bad",
		description: "Dying man builds drug empire and kills a lot of people",
		image: "http://ia.media-imdb.com/images/M/MV5BMTQ0ODYzODc0OV5BMl5BanBnXkFtZTgwMDk3OTcyMDE@._V1_SX640_SY720_.jpg",
		reviews: [ 
			{
			score: 10,
			body: "Super awesome. There were lots of drugs!"
			}, 
			{
			score: 7,
			body: "Pretty cool. I want to be like Walter White when I grow up!"
			},
			{
			score: 9,
			body: "Jesse is the coolest character!"
			}
		]
	},
	{
		title: "StarTrek",
		description: "It has spaceships and aliens and lazers. What more could you ask for?",
		reviews: [ 
			{
			score: 10,
			body: "Its pretty great! My favorite episode was the one with the spaceship!"
			}, 
			{
			score: 7,
			body: "I liked the aliens."
			},
			{
			score: 5,
			body: "Too much space for my liking."
			}
		]
	},
	{
		title: "Rick and Morty",
		description: "Honestly its hard to describe but it's pretty cool",
		reviews: [ 
			{
			score: 9,
			body: "I don't know whats happening but I love it."
			}, 
			{
			score: 10,
			body: "Wubba lubba dub dub!"
			},
			{
			score: 9,
			body: "Bird Person is my favorite character. I can't wait to see how it ends..."
			}
		]
	}
];

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
