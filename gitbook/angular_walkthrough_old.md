
# Angular Setup
1. Download Skeleton

2. Install dependencies

One directory outside of `/backend`, run this command in your terminal:

```
bower init
```

This will create a `bower.json` file to store your front-end dependencies. Press enter multiple times to go with the defaults.

Install angular and bootstrap:

```
bower install --save angular
bower install --save bootstrap
```
The `--save` will store these packages in your `bower.json`. That way, when another user wants to download your app, they only need this file to run `bower install` and all of the packages in this file will be included in the project.

#Part 1
Open your `app.js` file inside of the `app` folder.

  Create a module called `movies`:

```javascript
var app = angular.module('movies', []);
```

Now, create a controller called `MoviesController`:

```javascript
app.controller("MoviesController", function() {});
```

We will be using the $http service, so we will need to inject it into our controller:

```javascript
app.controller("MoviesController", ['$http', function($http) {}]);
```
Don't forget all of the brackets!

  Before we add logic to the controller, we need to do a few things to the `index.html` file to communicate with the angular code. In your `<html>` tag at the very top, add:

```html
<html ng-app='movies'>
```
In the opening body tag, add:

```html
<body class='gradient-background' ng-controller='MoviesController as collection'>
```
`collection` is the alias to which we will refer to the controller throughout the html.

Additionally, you will see that you will also need html tags to include angular and bootstrap, but those are already in the skeleton code.

#Part 2
We are ready to make our first call to our API!

Underneath the module declaration, add this global variable for the base URL. Replace `localhost` with your server URL.

```javascript
var API = "http://localhost:9000/api/"; //Your server url goes here
```
In the function body of the controller, make a GET request to get all of the movies when the page first loads:

```javascript
collection = this;

$http({
	 method: 'GET',
	 url: API+'movies',
	 headers: {
	   'Content-Type': undefined
	 }
	}).then(function success(response) {
        collection.movies = response.data;
	}, function error(error){
		console.log(error);
	});
```
The first section is the request header where we specify the type of request and the API endpoint. The `.then` section is what we call the *callback* which has 2 functions. If the API responds with a 200 status code, meaning success, then execute the success block. Otherwise, handle the error.

Now, in the html, we will display the movies. Find the `<!--Movie Entry-->` comment. Since we are displaying lots of movies, it wouldn't make sense to write the same html code over and over again. Luckily, we can use an Angular *directive* to loop through the movies and create identical views for each one.

```html
<!--Movie Entry-->
<div class='card thin-card' ng-repeat='movie in collection.movies'>
    ...
</div>
```

Another cool thing we can Angular is dynamic binding. This is how we can display the movie title and description:

```html
<!-- Movie Title -->
<h1 class='title movie-title'> {{ movie.title }} </h1>

...

<!-- Movie Description -->
<p class="movie-description"> {{ movie.description }} </p>
```

To correctly bind an angular markup to a src attribute, you MUST use the `ng-src` directive, like so:

```html
<!-- Movie Image -->
<div class="movie-image">
  <img ng-src="{{movie.image}}" width="200" height="300"/>  
</div>
```

This section of the html should now look like:

```html
<!--Movie Entry-->
<div class='card thin-card' ng-repeat='movie in collection.movies'>
  <div>
    <!-- Movie Title -->
    <h1 class='title movie-title'> {{ movie.title }} </h1>

    <!-- Movie Image -->
    <div class="movie-image">
      <img width="200" height="300"/>  
    </div>

    <!-- Movie Description -->
    <p class="movie-description"> {{ movie.description }} </p>

    <!-- Movie Review Icon -->
    <div ng-hide='movie.expandNewReviewEntry' class='form-group center-wrapper'>
      <img ng-click='movie.expandNewReviewEntry = true' class='review-dropdown-icon' src='public/plus.svg' />
    </div>
    ...
```

Checkpoint: You should be able to run your app and see the movies appear on the screen.

#Part 3
Let's add a new movie!

In your `app.js`, create a new function:

```javascript
collection.addNewMovie = function() {}

```

Inside the function body, make a POST request to the API:

```javascript
collection.addNewMovie = function() {
  $http({
      method: 'POST',
      url: API+'movies',
      data: {
          title: collection.newMovie.title,
          description: collection.newMovie.description
      }
  }).then(function successCallback(response) {

  }, function errorCallback(error) {

  });
};

```
This time, we are sending two pieces of data in the request body, the title and description of the new movie.

On success, the API will respond with the data that we sent it, the newMovie object. We will then push this new movie onto the collection array, so that it appears right away without making another API query. Then, clear out the newMovie object so that it can be reused.

```javascript
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
        
        // This line will unexpand the movie entry box on the UI
        collection.expandNewMovieEntry = false;
      } else {
          console.log("Failed: "+JSON.stringify(response.data));
      }
  }, function errorCallback(error) {
      console.log(error);
  });
};

```

Now let's implement this functionality in the html! Find the `<!--Add new movie-->` comment. In the opening form tag below, add the following directive that will call the `addNewMovie` function when the user submits the form.

```html
<form ng-submit='collection.addNewMovie()'>
...
</form>
```
There are two text fields on the form for title and description. One have an `<input>` tag (single line) and the other has a `<textarea>` tag (text box). In order to send the information from these text boxes to the Angular controller, use the `ng-model` directive.

```html
<input class='movie-input' type='text' ng-model='collection.newMovie.title' size='30' placeholder='Title'>

...

<textarea class='movie-input' ng-model='collection.newMovie.description' cols='30'></textarea>
```

Checkpoint: You should be able to create a new movie.

#Part 4
Reviews!

Just like we can add movies to our collection, we can add reviews to a movie.

Create a new function in `app.js`. The code is similar to that in `addNewMovie`. In this case, we add the particular movie id to the url path. 

```javascript
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
```
Now to the html. You know the drill! In the `<!--Movie Review-->` section, add the following `ng-submit` directive and `ng-model` directives:

```html
<!-- Movie Review Section -->
<div ng-show='movie.expandNewReviewEntry'>
  <!-- New Review Form -->
  <h3 class='title'>New Review</h3>
  <form ng-submit='collection.addReview(movie)'>
    <div class='form-group'>
      <label class='movie-label'>Score:</label>
      <input class="movie-input" type='text' ng-model='movie.review.score' placeholder='Score'>
    </div>
    <div class='form-group'>
      <label class='movie-label'>Review:</label>
      <input class="movie-input" type='text' ng-model='movie.review.body' placeholder='Review'>
    </div>
    <input class='movie-submit' type='submit' value='Add'>
  </form>
  ...
```

Below this form, we will also want to display a review list, but only if there is at least one review. To do this, use the `ng-show` directive. Use this directive on an element, and use any sort of logic to decide whether the contents within the element should be shown.

```html
<div ng-show='movie.reviews.length > 0'>
...
</div>
```

Now, add the `ng-repeat` directive and the review score and body. The reviews section should look like this:
```html
<div ng-show='movie.reviews.length > 0'>
    <h3 class="title review-header">Reviews</h3>
    <div ng-repeat='review in movie.reviews'>
    <h5 class="review-score"> Score: {{ review.score }} </h5>
    <p> {{ review.body }} </p>
</div>
```

Checkpoint: You should be able to view and add reviews.

#Part 5

You are seriously killing the game with Angular, but our app is a tad bland at this point. It could use some pizzazz, like a photo to go with each movie. This is a great opportunity because we can utilize *yet another* API to fetch an image by movie title. Let's get started!

In app.js, create this function:

```javascript
function fetchMovieImage(movie) {
}
```

In the function body, we will make a GET request to the Open Movie Database. This endpoint will look up a movie by title and respond with the poster image. Check out the docs at http://www.omdbapi.com. If no movie is found, then a default image will be used.

```javascript
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
```

We will call this function on every movie after we query the API on page load. Add this line to the success callback block of the GET /movies request:

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

We will also call this function when adding a new movie. Add this line in the success callback inside the POST /movies request inside the `addNewMovie` function:

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
Now, render these images in the html. To correctly bind an angular markup to a src attribute, you MUST use the `ng-src` directive, like so:

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
Final Checkpoint: Each movie should have an image.



