var app = angular.module('movies', []);
var API = "http://localhost:9000/api/"; //Your server url goes here


app.controller("MoviesController", ['$http', function($http) {

	var collection = this;

	$http({
	 method: 'GET',
	 url: API+'movies',
	 headers: {
	   'Content-Type': undefined
	 }
	}).then(function success(response) {
		angular.forEach(collection.movies, function(movie) {
			fetchMovieImage(movie);
		})

	}, function error(error){
		console.log(error);
	});

	/**
	 * Adds a new movie to the array. 
	 */
	collection.addNewMovie = function() {
		$http({
			method: 'POST',
			url: API+'movies',
			data: {
				title: collection.newMovie.title,
				description: collection.newMovie.description
			}
		}).then(function successCallback(response) {
			if(response.data.title != null && response.data.description != null) {
				console.log(JSON.stringify(response.data));
				collection.newMovie = {};
			    collection.movies.push(response.data);
			    collection.expandNewMovieEntry = false;
			    fetchMovieImage(response.data);
			} else {
				console.log("Failed: "+JSON.stringify(response.data));
			}
			
		}, function errorCallback(error) {
		    console.log(error);
		});
	};

	/**
	 * Adds a new review to the array
	 */
	collection.addReview = function(movie) {
		$http({
			method: 'POST',
			url: API+'movies/' + movie._id + '/reviews',
			data: {
				score: movie.review.score,
				body: movie.review.body
			}
		}).then(function successCallback(response) {
			if(response.data.score != null && response.data.body != null) {
				movie.review = {};
		    	movie.reviews.push(response.data);
			} else {
				console.log("Failed: "+JSON.stringify(response.data));
			}
		    
		}, function errorCallback(error) {
		    console.log(error);
		});
	};

	/**
	 * Fetches the image for the given movie and updates data.  
	 */
	function fetchMovieImage(movie) {
		$http({
		 method: 'GET',
		 url: 'http://www.omdbapi.com/?t='+movie.title+'&y=&plot=short&r=json',
		 headers: {
		   'Content-Type': undefined
		 }
		}).then(function(response){
			if(response.data.Poster != null) 
				movie.image = response.data.Poster;
		},function(error){
	    	console.log(error);
		})
	}
}]);
