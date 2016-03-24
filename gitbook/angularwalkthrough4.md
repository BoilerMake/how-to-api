# Angular Walkthrough- Part 4

Now it's time to add Reviews! Just like we can add movies to our collection, we can add reviews to a movie.

Create a new function in our controller. The code is similar to `addNewMovie`, except this time we're going to create a review. Our server expects us to include the movie id when adding a review (remember how we wrote `/api/:id/reviews` in our server). In this case, we add the particular movie id to the url path. 

```javascript
/**
 * Again, we use the $http method to send a POST request to our movie API. 
 * Because its a POST request we provide the data we want to send.
 * We use the .then() method to pass in our success and error functions. 
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
      //Make sure the response data is okay
      if(response.data.score != null && response.data.body != null) {
          movie.review = {}; //Clear the review data to reset the form
          movie.reviews.push(response.data); //Add this review to this movie's array
      } else {
          console.log("Failed: "+JSON.stringify(response.data));//We use JSON.stringify to make the response data human-readable
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

We only want to show our review section if the user has opened the review section. We also want to display a list of reviews, but only if there is at least one review. To do this, use the `ng-show` directive. When we use this directive on an element, it will only be shown if the condition we pass is true. In this example, we only show the section if there is at least one review: 

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

At this point, you should be able to view and add reviews! Now all our functionality is here, so we just need to add the finishing touches... 

