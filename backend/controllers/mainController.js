/*
 * =======================================================================
 * This controller handles our routing functions. We can use
 * response.send() to send a message back to the client.
 * We can use request.params to see url paramaters (paramaters 
 * that are in the url, e.g. the "1" in api/entries/1). And we can use 
 * request.body to see POST paramaters (paramaters that are sent 
 * in the POST request). 
 * =======================================================================
 */

/*
 * Load our dependencies.
 */
var Movie = require('../models/movie'); //We also need to load the Movie model.


/*
 * The table below lists the routes we will implement, just for reference.
 * 
 * Application Routes
 * ------------------------------------------------------------------------------------------
 * URI 						| HTTP ACTION 		| POST Body 		| Result
 * ------------------------------------------------------------------------------------------
 * api/movies               GET                  Empty                List of all users
 * api/movies/:id           GET                  Empty                One user w/ details
 * api/movies               POST                 JSON                 Adds provided user
 * api/movies/:id/reviews   POST                 JSON                 Adds provided review
 * ------------------------------------------------------------------------------------------
 */


/**
 * This setupRoutes function will create
 * all of the routes for our server to use. 
 * Everything inside the Module.exports variable
 * will be returned if we call require() from 
 * a different file. We pass in the 'app' paramater
 * from our server.js file so we can set up routes.
 */
module.exports.setupRoutes = function(app) {
	
	/*
	 * This function gets called when a client makes a GET request
	 * to the root of the app, like "www.myWebsite.com/".
	 * It just sends back a hello world message in plain text.
	 */
	app.get('/', function(request, response) {
		response.send("Your server is alive, and you're in the right place!");
	});

	/*
	 * This function gets called when a client makes a GET request to "/api/movies". 
	 * Here we send our entire data array to the client.
	 */
	app.get('/api/movies', function(request, response) {
		/* Look up EVERY movie in the database. We can use the first argument to 
		 * narrow down the search. So if we leave it empty, we'll get all movies. 
		 */
		Movie.find({}, function(err, movies) {
			/*
			 * Make sure there was no error
 			 */
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
	app.get('/api/movies/:id', function(request, response) {
		/* 
		 * We use findOne() here since we just want to get one movie.
		 * Like find, the first paramater lets us narrow down our search.
		 * We're asking for the entry which has an _id equal to request.params.id.
		 */
		Movie.findOne({_id: request.params.id},function(err, movie){
			/**
			 * Make sure there was no error. If
			 * there was an error, send back a 500
			 * (internal server error) status code. 
			 */
			if(!err) {
				response.send(movie); //Send result to client
			} else {
				response.sendStatus(500); //Send an error to client
			}
		});
	});

	/*
	 * This function is called when the client makes a POST request to "/api/movies".
	 * The movie data we need to insert is given to us in the request body. 
	 * If the data is valid, we add that to our database. 
	 */
	app.post('/api/movies', function(request, response) {
		/*
		 * Collect the data we got from the client, and
		 * insert it into a JSON object  
		 */
		var dataToInsert = {
			title: request.body.title,
			description: request.body.description,
			image: request.body.image
		};
		
		/*
		 * Create a new Movie from that data
		 * using the mongoose Movie model. 
		 */
		var newMovie = new Movie(dataToInsert);

		/*
		 * Actually save our new movie to the database.
		 * If we get an error, send that error to the client 
		 * so they know what went wrong.  
		 */
		newMovie.save(function(err) {
			if(err)
				response.send(err); //Print error if there was a problem
			else
				response.send(newMovie); //Send the client the new movie we just inserted
		});
	});

	/*
	 * This function is called when the client makes a POST request to "/api/movies/:id/reviews".
	 * The data we need to insert is given to us in the request body. 
	 * We take that data and add it to the review array. 
	 */
	app.post('/api/movies/:id/reviews', function(request, response) {
		
		var movieID = request.params.id; //Movie ID will be taken from the URL   
		/*
		 * The data to use for the review will come from the request body.
		 * We insert that data into a JSON object. 
		 */
		var dataToInsert = {
			score: request.body.score,
			body: request.body.body
		};

		/*
		 * Look up the movie this review is for.
		 * We pass {_id: movieID} so mongoose knows
		 * which movie to look for.  
		 */
		Movie.findOne({_id: movieID}, function(err, movie) {
			/*
			 * Make sure there was no error finding this movie. 
			 * If there was, then the err variable will be set. 
			 */
			if(err) {
				return response.sendStatus(500); //Send an error to client, and return so that the function stops here. 
			}
			
			/*
			 * Add this review to the movie's array. 
			 * Then save the movie like we did before. 
			 */
			movie.reviews.push(dataToInsert);
			movie.save(function(err) {
				/*
				 * Make sure there was no error. Even though
				 * the movie exists, the user may have entered
				 * invalid data (like a negative score).  
				 */
				if(err)
					response.send(err); //Print error if there was a problem
				else
					response.send(movie.reviews[movie.reviews.length-1]);	//Send the client the new movie we just inserted
			});
			
		});
	});
}