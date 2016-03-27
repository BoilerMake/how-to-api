var app = angular.module('movies', []);
var API = "http://localhost:9000/api/"; //Your server url goes here

/**
 * Here we define a new controller called MoviesController. 
 * We require $http, so angular injects it automatically. 
 */
app.controller("MoviesController", ['$http', function($http) {

	var collection = this; //Save this controller 

	function init() {
		$http({
		 method: 'GET',
		 url: API+'movies',
		 headers: {
		   'Content-Type': undefined
		 }
		}).then(function success(response) {
			
			//If this was successfull, handle the data from the server
			collection.movies = response.data; //Copy the response data into our movie array

			//Load the image for each movie
			angular.forEach(collection.movies, function(movie) {
				fetchMovieImage(movie);
			})

		}, function error(error){
			console.log(error);
		});
	}

	init();

	/**
	 * Called when create form submits
	 */
	collection.addNewMovie = function() {
		movie = {
				title: collection.newMovie.title,
				description: collection.newMovie.description
		}

		createMovie(movie);
	};


	/**
	 * Called when review form submits
	 */
	collection.addReview = function(movie) {

		review = {
			score: movie.review.score,
			body: movie.review.body
		}
		
		addReviewToMovie(movie, review);
	};



	/**
	* These functions make requests to the API
	*/

	function createMovie(movie) {
		/**
		 * Like before, we use the $http method to send a POST request to our movie API. 
		 * Because its a POST request we provide the data we want to send.
		 * We use the .then() method to pass in our success and error functions. 
		 */
		$http({
			method: 'POST',
			url: API+'movies',
			data: movie
		}).then(function successCallback(response) {
			//Make sure the response has the data we need
			if(response.data.title != null && response.data.description != null) {
				//Log the data just for reference
				console.log(JSON.stringify(response.data)); //We use JSON.stringify to make the response data human-readable
				collection.newMovie = {}; //Clear the newMovie data to reset the form. 
			    collection.movies.push(response.data); //Add the new movie to our movie array
			    collection.expandNewMovieEntry = false; //Close the movie creation form
			    fetchMovieImage(response.data); //Load the image for this new movie
			} else {
				//The response was missing data, something went wrong. 
				console.log("Failed: "+JSON.stringify(response.data)); //We use JSON.stringify to make the response data human-readable
			}
		}, function errorCallback(error) {
		    console.log(error);
		});
	}

	function addReviewToMovie(movie, review) {
		/**
		 * Again, we use the $http method to send a POST request to our movie API. 
		 * Because its a POST request we provide the data we want to send.
		 * We use the .then() method to pass in our success and error functions. 
		 */
		$http({
			method: 'POST',
			url: API+'movies/' + movie._id + '/reviews',
			data: {
				score: movie.review.score,
				body: movie.review.body
			}
		}).then(function successCallback(response) {
			//Make sure the response data is okay
			if(response.data.score != null && response.data.body != null) {
				movie.review = {}; //Clear the review data to reset the form
		    	movie.reviews.push(response.data); //Add this review to this movie's array
			} else {
				console.log("Failed: "+JSON.stringify(response.data)); //We use JSON.stringify to make the response data human-readable
			}
		}, function errorCallback(error) {
		    console.log(error); //Something was wrong with our request, print the error
		});
	}

	/**
	 * Fetches the image for the given movie and updates data.
	 */
	function fetchMovieImage(movie) {
		/**
		 * We use the $http method to send a GET request to a movie poster API. 
		 * We add the movie name into the middle of the url so the API knows what to search for.
		 * We use the .then() method to pass in our success and error functions. 
		 */
		$http({
		 method: 'GET',
		 url: 'http://www.omdbapi.com/?t='+movie.title+'&y=&plot=short&r=json',
		 headers: {
		   'Content-Type': undefined
		 }
		}).then(function(response){
			//If the response data was valid, set the movie image
			if(response.data.Poster != null)
				movie.image = response.data.Poster; //Set the movie image to the url we got from the server
		},function(error){
	    	console.log(error); //Something went wrong, log the error
		})
	}

}]);
