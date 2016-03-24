#Angular Walkthrough- Part 3
Let's allow the user to add new movies!

In your `app.js`, add a new function to the controller:

```javascript
collection.addNewMovie = function() {}

```

Inside the function body, make a POST request to the API. This works the same way as before, except now we need to include some data in the request. This is the data of the movie we want to create. 

```javascript
/**
 * Like before, we use the $http method to send a POST request to our movie API. 
 * Because its a POST request we provide the data we want to send.
 * We use the .then() method to pass in our success and error functions. 
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
    //Make sure the response has the data we need
    if(response.data.title != null && response.data.description != null) {
        console.log(JSON.stringify(response.data)); //We use JSON.stringify to make the response data human-readable
        
        collection.newMovie = {}; //Clear the newMovie data to reset the form. 
        collection.movies.push(response.data); //Add the new movie to our movie array
        collection.expandNewMovieEntry = false; //Un-expand the movie entry box on the UI
      } else {
          console.log("Failed: "+JSON.stringify(response.data)); //We use JSON.stringify to make the response data human-readable
      }
  }, function errorCallback(error) {
      console.log(error);
  });
};

```

Now let's implement this functionality in the html! Find the `<!--Add new movie-->` comment. In the form tag, we're going to add another angular directive called `ng-submit`. When the form submits, the function we provide will be called automatically. In this case, we want to call the `addNewMovie` function when the user submits the form.

```html
<form ng-submit='collection.addNewMovie()'>
...
</form>
```
There are two text fields on the form for title and description. One has an `<input>` tag and the other has a `<textarea>` tag. They're basically the same, except that a textarea is much bigger. To connect these text boxes to the Angular controller, use the `ng-model` directive:

```html
<input class='movie-input' type='text' ng-model='collection.newMovie.title' size='30' placeholder='Title'>

...

<textarea class='movie-input' ng-model='collection.newMovie.description' cols='30'></textarea>
```

At this point, you should be able to create a new movie using the  form you created. After adding a movie, it should show up on your page automatically! 