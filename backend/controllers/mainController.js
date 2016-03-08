/*
 * ====================================================================================================================
 * This controller handles our routing functions. 
 * We can use response.send() to send a message back to the client
 * We can use request.params to see url paramaters (paramaters that are in the url, e.g. the "1" in api/entries/1)
 * We can use request.body to see POST paramaters (paramaters that are sent in the POST request)
 * ====================================================================================================================
 */


// First we load our dependencies. 
var mongoose = require('mongoose'); //We need the mongoose library so we can work with our database.
var Movie = require('../models/movie'); //We also need to load the Movie model.
var validator = require('express-validator'); //Allows us to check POST data to make sure its valid


/*
 * The table below lists the routes we will implement, just for reference.
 * 
 * Application Routes
 * ------------------------------------------------------------------------------------------
 * URI 						| HTTP ACTION 		| POST Body 		| Result
 * ------------------------------------------------------------------------------------------
 * api/movies 	 			GET 			 	 Empty 				  List of all users
 * api/movies/:id 			GET    			 	 Empty   			  One user w/ details
 * api/movies 				POST 				 JSON                 Adds provided user
 * api/movies/:id/reviews   POST  				 JSON    			  Adds provided review
 * ------------------------------------------------------------------------------------------
 */


/**
 * This setupRoutes function will create
 * all of the routes for our server to use
 */
module.exports.setupRoutes = function(app) {
	/*
	 * This function gets called when a client makes a GET request
	 * to the root of the app, like "www.myWebsite.com/".
	 * It just sends back a hello world message for testing.
	 */
	app.get('/',function(request,response) {
		response.send("Your server is alive, and you're in the right place!");
	});

	/*
	 * This function gets called when a client makes a GET request to "/api/movies". 
	 * Here we send our entire data array to the client.
	 */
	app.get('/api/movies',function(request,response) {
		//Look up EVERY movie in the database. We can use the first argument to 
		//narrow down the search. So if we leave it empty, we'll get all movies. 
		Movie.find({},function(err,movies) {
			//Make sure there was no error
			if(!err) {
				response.send(movies); //Send the result back to the client
			} else {
				response.sendStatus(500); //Send an error back to the client
			}
		});
	});

	/*
	 * This function gets called when a client makes a GET request to "/api/movies/<something>"
	 * It sends one specific entry from our data array to the client. 
	 * The 'id' paramater lets us know which entry the client asked for.
	 */
	app.get('/api/movies/:id',function(request,response) {

		//Check to make sure our request is valid
		request.checkParams('id','Invalid id').notEmpty().isMongoId();
		var errors = request.validationErrors()
		if(errors) {
			//Request was invalid. Send back the error messages
			response.send("Errors: "+JSON.stringify(errors));
			return;
		}

		//We use findOne() here since we just want to get one movie.
		//Like find, the first paramater lets us narrow down our search.
		//We're asking for the entry which has an _id equal to request.params.id.
		Movie.findOne({_id: request.params.id},function(err,movie){
			//Make sure there was no error
			if(!err) {
				response.send(movie); //Send result to client
			} else {
				response.sendStatus(500); //Send an error to client
			}
		});
	});

	/*
	 * This function is called when the client makes a POST request to "/api/movies".
	 * The data we need to insert is given to us in the request body. 
	 */
	app.post('/api/movies',function(request,response) {

		//Check to make sure our request is valid
		request.checkBody('description','Invalid description').notEmpty();
		request.checkBody('title','Invalid title').notEmpty();
		var errors = request.validationErrors()
		if(errors) {
			//Request was invalid. Send back the error messages
			response.send("Errors: "+JSON.stringify(errors));
			return;
		}

		//Collect the data we got from the client  
		var dataToInsert = {
			title: request.body.title,
			description: request.body.description
		};
		//Create a new Movie from that data
		var newMovie = new Movie(dataToInsert);

		//Actually save our new movie to the database
		newMovie.save(function(err,fluffy) {
			//Print an error message if something went wrong
			if(err)
				return console.error(err); //Print error if there was a problem
		});
		//Send the client the _id for the thing we just inserted
		response.send(newMovie._id);
	});


	/*
	 * This function is called when the client makes a POST request to "/api/movies/:id/reviews".
	 * The data we need to insert is given to us in the request body. 
	 * We take that data and add it to the review array. 
	 */
	app.post('/api/movies/:id/reviews',function(request,response) {
		//Check to make sure our request is valid
		request.checkBody('score','Invalid score').notEmpty().isInt();
		request.checkBody('body','Invalid body').notEmpty();
		request.checkParams('id','Invalid id').notEmpty().isMongoId();
		var errors = request.validationErrors()
		if(errors) {
			//Request was invalid. Send back the error messages
			response.send("Errors: "+JSON.stringify(errors));
			return;
		}

		//Collect the data we got from the client
		var movieID = request.params.id; //Movie ID will be taken from the URL   
		//The data to use for the review will come from the request body
		var dataToInsert = {
			score: request.body.score,
			body: request.body.body
		};

		//Look up the movie this review is for
		Movie.findOne({_id: movieID},function(err,movie){
			//Make sure there was no error
			if(!err) {
				//Add this review to the reviews arary
				movie.reviews.push(dataToInsert);
				movie.save();
				response.send(movie.reviews[movie.reviews.length-1].id); //Return just the id of the new movie here.
			} else {
				response.sendStatus(500); //Send an error to client
			}
		});
	});
}
