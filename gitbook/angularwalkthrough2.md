#Angular Walkthrough- Part 2
We are ready to make a call to our API!

Underneath the module declaration, add this global variable for the base URL. Replace `localhost` with your server URL. Make sure you leave the final `/` at the end!

```javascript
var API = "http://localhost:8080/api/"; //Your server url goes here
```
In the function body of the controller, we're going to make a GET request using the `$http` service. This will grab all of the movies when the page first loads. Add this to your controller:

```javascript
collection = this;
/**
 * Use the $http method to send a GET request to our movie API. 
 * We provide some details in the first paramater. 
 * We use the .then() method to pass in our success and error functions. 
 */
$http({
	 method: 'GET',
	 url: API+'movies',
	 headers: {
	   'Content-Type': undefined
	 }
	}).then(function success(response) {
        //If this was successfull, handle the data from the server
        collection.movies = response.data; //Copy the response data into our movie array
	}, function error(error){
		console.log(error);
	});
```
The first section is the request header where we specify the type of request and the API endpoint (the url). The `.then` section is a *callback*, and it has 2 functions. If the API responds with a 200 status code, meaning success, then we execute the success block. Otherwise, we handle the error.

Now, in the html, we will display the movies. Find the `<!--Movie Entry-->` comment. Since we are displaying lots of movies, it wouldn't make sense to write the same html code over and over again. Luckily, we can use an Angular *directive* to loop through the movies and create identical views for each one.  

```html
<!--Movie Entry-->
<div class='card thin-card' ng-repeat='movie in collection.movies'>
    ...
</div>
```

Another cool thing we can do in Angular is dynamic binding. "Binding" means that we connect the data in our controller directly to the page. Dynamic means that if the data changes, the page will be updated. This is how we can display the movie title and description:

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

At this point, you should be able to run your app and see the movies appear on the screen. Don't worry if the images don't load, since we'll add that later. 