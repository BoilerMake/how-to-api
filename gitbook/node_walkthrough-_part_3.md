# Node Walkthrough- Controller Setup

Now you have a basic express server and a mongoDB database set up. Next, we need to create the logic that will let users interact with the database. 

##Creating our Controller
Right now we have our "Hello World" route sitting in our `server.js` file. This works fine, but as our project gets larger things will get messy if we put all of our functions in one file. To help organize things, we can create a controller that will hold the logic for our API. A big project will have many controllers, but we're only going to make one.

Let's make a new folder called "controllers". This should go in the same place as our `server.js` file. We'll make a new file in that folder called `mainController.js`.

First we'll use require() to load mongoose, just like we did earlier. This time we'll also use require() to load the movie Model we created earlier. Remember that this is possible because we set the `module.exports` variable to our Movie model. Add this code to the controller file: 

```javascript
/*
 * ====================================================================================================================
 * This controller handles our routing functions. 
 * We can use response.send() to send a message back to the client
 * We can use request.params to see url paramaters (paramaters that are in the url, e.g. the "1" in api/entries/1)
 * We can use request.body to see POST paramaters (paramaters that are sent in the POST request)
 * ====================================================================================================================
 */


// First we load our dependencies. 
var mongoose = require('mongoose'); //We need the mongoose library so we can work with our database.
var Movie = require('../models/movie'); //We also need to load the Movie model.

```

Next we're going to create a function that will set up our application routes, and then we'll export that function so we can use it in other files. 

```javascript
module.exports.setupRoutes = function(app) {
	//TODO: Add our route functions here
}
```

##Creating our Routes

Now we're going to start creating our routes. Each of these routes should be added **inside** the setupRoutes function we just made. Let's move our "hello world" route from earlier into this file: 

```javascript
module.exports.setupRoutes = function(app) {
	//TODO: Add our route functions here
	
	//Hello World 
	app.get('/',function(request,response) {
		response.send("Hello World!");
	});
}
```

Now we'll start creating some new routes that actually do things. When the user makes a GET request to "/api/movies", we want to send back a list of everything in the database. The code below will handle this. We use Movie.find() to search our database for Movies. The first argument lets us narrow down the results, but since we want everything in the database we pass an empty object. The second argument is our callback. The "movies" variable will be set to a list of all our movies. The "err" variable will automatically be set if the user tried to enter invalid data. So we check to make sure error is not defined (that's what !err does), and then we send back the list of all movies. If "err" was defined, we send back an error to the client.

Add this code to your setupRoutes function: 

```javascript
     /*
	 * This function gets called when a client makes a GET request to "/api/movies". 
	 * Here we send our entire data array to the client.
	 */
	app.get('/api/movies',function(request,response) {
		//Look up EVERY movie in the database. We can use the first argument to 
		//narrow down the search. So if we leave it empty, we'll get all movies. 
		Movie.find({},function(err,movies) {
			//Make sure there was no error
			if(!err) {
				response.send(movies); //Send the result back to the client
			} else {
				response.sendStatus(500); //Send an error back to the client
			}
		});
	});
```
Next we're going to create a route for when the user wants to get one specific movie. This is pretty similar to what we just did, but with three differences. First, the url will be `/api/movies/:id`. The `:id` lets express know that we want to take whatever the user puts there and save it into the `request.params.id` variable. For example, if the user goes to `/api/movies/7` then  `request.params.id` will be equal to 7. 

Second, we'll use findOne() instead of find(). It's the same idea, except findOne() makes sure we only get one result max. Finally, we're going to narrow down our search by looking for a specific id. If we pass the object `{_id: request.params.id}` into the findOne() function, it will look for the movie who's `_id` field matches the id the user specified. Add this function into the controller: 

```javascript
    /*
	 * This function gets called when a client makes a GET request to "/api/movies/<something>"
	 * It sends one specific entry from our data array to the client. 
	 * The 'id' paramater lets us know which entry the client asked for.
	 */
	app.get('/api/movies/:id',function(request,response) {
		//We use findOne() here since we just want to get one movie.
		//Like find, the first paramater lets us narrow down our search.
		//We're asking for the entry which has an _id equal to request.params.id.
		Movie.findOne({_id: request.params.id},function(err,movie){
			//Make sure there was no error
			if(!err) {
				response.send(movie); //Send result to client
			} else {
				response.sendStatus(500); //Send an error to client
			}
		});
	});
```

##Updating server.js

Now we have our first few routes ready to go, but just listing them in the controller doesn't actually do anything. We need to actually set up the controller in our `server.js` file and make a few other changes. So open up `server.js` 

First, we'll use require() to load two more modules that we installed earlier. BodyParser will allow us to read the body data for POST requests. Cors will allow our server to respond to requests from other domains (if we don't use cors, your server will work locally but not on the internet). 

Add these require() statements to the top of `server.js`: 
```javascript
var bodyParser = require('body-parser'); //BodyParser allows us to easily parse data for POST requests
var cors = require('cors'); //Allows our server to respond to requests from other servers
```

BodyParser and Cors are something called middleware. Middleware is code that gets run in-between receiving a request and actually handing it. For example, you might have middleware that makes all request data uppercase. In express, we can use `app.use()` to assign middleware. The code below tells express to use 2 pieces of middleware from the BodyParser module, as well as the middleware from Cors. 

Add this code to your `server.js` file after setting the port and ip address, but before running listen().  
```javascript
/*
 * Set up middleware on our application using the modules we loaded earlier.  
 */
app.use(bodyParser.urlencoded({extended: true})); //Use bodyParser to read x-www-form-urlencoded data (like in Postman)
app.use(bodyParser.json()); //Use bodyParser to read JSON data
app.use(cors()); //Allow requests from other servers
```

Next we want to set up our controller. We just need to load the `mainController.js` file and then call the function we set up earlier. Add this code to your `server.js`.  
```javascript
/*
 * Connect our routes to functions in the controller we just loaded.
 * We can use app.get() or app.post() to create routes for get or post requests.
 * We pass in the url for the route, and then the function to handle it. 
 */
mainController = require('./controllers/mainController.js'); //Load the controller we made earlier from the /controllers folder
mainController.setupRoutes(app); //Run the setup method from the main controller
```

Now you should be able to run `node server.js` and things should be working! If you visit the `/api/movies` url of your server you should a list of all movies. You should also be able to go to `/api/movies/SOME_MOVIE_ID` and see the data for just that movie. 

![](http://i.imgur.com/URoUu5T.png)

If you get an empty response (like just two brackets [ ]) then make sure you've run `seeder.js` to add entries to the database. If you get an error, make sure that mangod is running in the background. 