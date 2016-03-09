var app = angular.module('movies', []);

app.controller("MoviesController", ['$http', function($http) {

	var collection = this;

	$http({
	 method: 'GET',
	 url: 'http://localhost:9000/api/movies',
	 headers: {
	   'Content-Type': undefined
	 }
	}).then(function success(response) {
		collection.movies = response.data;
	}, function error(error){
		console.log(error);
	});

	collection.addNewMovie = function() {
		$http({
			method: 'POST',
			url: 'http://localhost:9000/api/movies',
			data: {
				title: collection.newMovie.title,
				description: collection.newMovie.description
			}
		}).then(function successCallback(response) {
			collection.newMovie = {};
		    collection.movies.push(response.data);
		}, function errorCallback(error) {
		    console.log(error);
		});
	};

	collection.addReview = function(movie) {
		$http({
			method: 'POST',
			url: 'http://localhost:9000/api/movies/' + movie._id + '/reviews',
			data: {
				score: movie.review.score,
				body: movie.review.body
			}
		}).then(function successCallback(response) {
		    movie.review = {};
		    movie.review.push(response.data);
		}, function errorCallback(error) {
		    console.log(error);
		});
	};

}]);
