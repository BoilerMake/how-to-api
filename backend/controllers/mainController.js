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
var Movie = require('../models/Movie'); //We also need to load the Movie model.

 
/*
 * This function gets called when a client makes a GET request
 * to the root of the app, like "www.myWebsite.com/".
 * It just sends back a hello world message for testing.
 */
exports.helloWorld = function(request,response) {
	response.send("Your server is alive, and you're in the right place!");
}

/*
 * This function gets called when a client makes a GET request to "/api/entries". 
 * Here we send our entire data array to the client.
 */
exports.getEntries = function(request,response) {
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
}

/*
 * This function gets called when a client makes a GET request to "/api/<something>"
 * It sends one specific entry from our data array to the client. 
 * The 'id' paramater lets us know which entry the client asked for.
 */
exports.getSingleEntry = function(request,response) {
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
}

/*
 * This function is called when the client makes a POST request to "/api/insert".
 * The data we need to insert is given to us in the request body. 
 */
exports.addEntry = function(request,response) {
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
}