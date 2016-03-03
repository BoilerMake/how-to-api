var app = angular.module('movies', []);

app.controller("MoviesController", ['$http', function($http) {

	var collection = this;

	$http({
	 method: 'GET',
	 url: 'https://api.themoviedb.org/3/movie/now_playing',
	 headers: {
	   'Content-Type': undefined
	 },
	 params: {
	 	'api_key': "a07e22bc18f5cb106bfe4cc1f83ad8ed"
	 }
	}).then(function success(response){
		console.log(response);
		collection.movies = response.data.results;
	}, function error(error){
		console.log(error);
	});

}]);
