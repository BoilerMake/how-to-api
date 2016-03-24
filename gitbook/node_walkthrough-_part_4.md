# Node Walkthrough- Final Steps

Now you have a working server that talks to our mongoDB database. The user can make a GET request and see data about which movies have been added to the database. Now the last step is to allow users to create their own movies and add them to the database. Luckily, most of the hard work is finished and we only need to add 2 more controller functions!

##Finishing our Controller
We're going to create two more routes: one for creating a new movie, and one for creating a new review. Open up `mainController.js`, and add the method below to our setupRoutes() function. 

Remember how we set up the BodyParser middleware earlier? Because of that, the request body data from our users will be added to the request.body variable. So we create an object called dataToInsert and set it's title and description to whatever the user specified in the request body. Then we create a new Movie object using that data, and try to save it. 

The save() method will trigger the callback we provide once it's finished running. If there was an error, we send back the error. Otherwise, we send the new movie to the client.  

```javascript
    /*
	 * This function is called when the client makes a POST request to "/api/movies".
	 * The data we need to insert is given to us in the request body. 
	 */
	app.post('/api/movies',function(request,response) {
		//Collect the data we got from the client  
		var dataToInsert = {
			title: request.body.title,
			description: request.body.description,
		};
		//Create a new Movie from that data
		var newMovie = new Movie(dataToInsert);

		//Actually save our new movie to the database
		newMovie.save(function(err) {
			//Print an error message if something went wrong
			if(err)
				response.send(err); //Print error if there was a problem
			else
				response.send(newMovie);	//Send the client the new movie we just inserted
		});
	});
```

Now we just need to add one final method for creating movie reviews. The idea behind this function is very similar to the last. The difference is that now we need to find the movie that the user has specified, and then save the new review. We also use the `:id` in the url again just like before. 

We use findOne() exactly like we did before. Instead of sending back movie data if there's no error, we add the review to the movie's review array using push(). Then we call save() again to update the database, and check to make sure there were no errors.  

```javascript
    /*
	 * This function is called when the client makes a POST request to "/api/movies/:id/reviews".
	 * The data we need to insert is given to us in the request body. 
	 * We take that data and add it to the review array. 
	 */
	app.post('/api/movies/:id/reviews',function(request,response) {
		
		var movieID = request.params.id; //Movie ID will be taken from the URL   
		//The data to use for the review will come from the request body
		var dataToInsert = {
			score: request.body.score,
			body: request.body.body
		};

		//Look up the movie this review is for
		Movie.findOne({_id: movieID},function(err,movie) {
			//Make sure there was no error finding this movie
			if(!err) {
				//Add this review to the reviews arary
				movie.reviews.push(dataToInsert);
				//Save the review
				movie.save(function(err) {
					//Make sure our review was saved
					if(err)
						response.send(err); //Print error if there was a problem
					else
						response.send(movie.reviews[movie.reviews.length-1]);	//Send the client the new movie we just inserted
				});
			} else {
				//We didn't find a movie with that ID. 
				response.sendStatus(500); //Send an error to client.
			}
		});
	});
```

And that's all the coding you need to do for the server! If you run your server, you should be able to [add new movies](http://i.imgur.com/yJ6Gmwd.png) and [reviews](http://i.imgur.com/0BWPycn.png) using postman. Thanks to all the rules we set up in our movie schema, if you try to add invalid data you'll receive an [error](http://i.imgur.com/GyYzLhY.png) that explains what went wrong. 

![](http://i.imgur.com/yJ6Gmwd.png)

##All Done!

That's it! You have a fully working (and very cool) API. Along the way you learned about cool technologies like NodeJS and MongoDB. You learned how to use awesome npm modules like Express and Mongoose. You even learned how to set up middleware like BodyParser and Cors. Pat yourself on the back and enjoy your awesome result!    