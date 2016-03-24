# Angular Walkthrough- Part 5
You are seriously rocking it with Angular, but our app is a little bland at this point. It could use some pizzazz, like a photo to go with each movie. This is a great opportunity because we can utilize *another* API to fetch an image just from the movie title. We'll use the [Open Movie Database](http://www.omdbapi.com/) to do this. Let's get started!

In app.js, create this function in our controller:

```javascript
function fetchMovieImage(movie) {
}
```

In the function body, we will make a GET request to the Open Movie Database. This endpoint will look up a movie by title and respond with the poster image. Check out the docs at http://www.omdbapi.com if you're interested. If no movie is found, then a default image will be used.

```javascript
/**
 * We use the $http method to send a GET request to a movie poster API. 
 * We add the movie name into the middle of the url so the API knows what to search for.
 * We use the .then() method to pass in our success and error functions. 
 */
function fetchMovieImage(movie) {
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
      console.log(error);//Something went wrong, log the error
  })
}
```

Now we need to call this function whenever we load a new movie. Add this line to the success callback of the GET movies request (the code we added to the controller first):

```javascript
angular.forEach(collection.movies, function(movie) {
	fetchMovieImage(movie);
}
```

Your complete request should now look like:

```javascript
$http({
	 method: 'GET',
	 url: API+'movies',
	 headers: {
	   'Content-Type': undefined
	 }
}).then(function success(response) {
    collection.movies = response.data;
    angular.forEach(collection.movies, function(movie) {
        fetchMovieImage(movie);
    })
}, function error(error){
    console.log(error);
});
```

We will also call this function when adding a new movie. Add this line in the success callback inside the `addNewMovie` function:

```javascript
fetchMovieImage(response.data);
```

Your complete request should now look like:

```javascript
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
```
Now we need to render these images in the html. To correctly bind an angular markup to a src attribute, you MUST use the `ng-src` directive, like so:

```html
<!-- Movie Image -->
<div class="movie-image">
  <img ng-src="{{movie.image}}" width="200" height="300"/>  
</div>
```

A good place to add the image is between the title and the description. This section should now look like this: 

```html
<!--Movie Entry-->
<div class='card thin-card' ng-repeat='movie in collection.movies'>
  <div>
    <!-- Movie Title -->
    <h1 class='title movie-title'> {{ movie.title }} </h1>

    <!-- Movie Description -->
    <p class="movie-description"> {{ movie.description }} </p>

    <!-- Movie Review Icon -->
    <div ng-hide='movie.expandNewReviewEntry' class='form-group center-wrapper'>
      <img ng-click='movie.expandNewReviewEntry = true' class='review-dropdown-icon' src='public/plus.svg' />
    </div>
    ...
```
There you go! You should now have a beautiful webapp!  

