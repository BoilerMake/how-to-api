# Node Walkthrough- Mongoose Setup

Now you have a basic express server working with a single route. That's pretty awesome, but now we'd like our server to actually do something.

We're going to be using MongoDB to store data for our project. In order to work with MongoDB, we will use a library called Mongoose that we installed earlier. 

##Running Mongod
In order for us to connect to MongoDB, we will need to run a program called "Mongod". This program works like the control center for mongo, so if it isn't running we won't be able to read or write data to our database. Mongod comes installed with cloud9 already, but we need to set it up. To set it up, just run this command in your terminal: 

```
./setupMongod.sh 
mongod
```
Mongod needs to keep running in the background, so you will need to create a new terminal tab in cloud9 if you want to run more commands. Leave the mongod tab running in the background.  

##Setting up Mongoose and MongoDB

Okay, so first we'll need to load the mongoose library and store it in a variable. Add this line to the top of your `server.js` with the other require() statements. 

```javascript
var mongoose = require('mongoose'); //Allows us to work with our mongoDB database
```

Next we're going to connect mongoose to our MongoDB database. Add this function right after we call env(). This tells mongoose to connect to whatever mongo database is specified in our `.env` file. Cloud9 handles this for us, so we don't need to actually change anything in our `.env` file. 

```javascript
mongoose.connect(process.env.MONGODB); //Connect to our database using the address we set in .env
```

That's all we need to do in `server.js` for now. Next, we need to create a model for mongoose to use. 

##Setting up a Movie Model
Mongoose uses Models to keep track of what data we want to store for a particular type of object. A cat model might store a name, age, and color. A user model might store a username, password, and email. In our case, we're going to make a movie model. 

Let's make a new folder called `models` in the same directory as our `server.js` file. Next we'll create a new file in that folder called `movie.js`. The first thing we'll do is use require() to load mongoose so we can work with our database. Add this code to the file:

```javascript
/*
 * ==============================================================================
 * This file creates a model that tells mongoose what 
 * information we want to store about Movies.
 * First we define our Schema, and then we 
 * export the model for mongoose.  
 * ==============================================================================
 */

var mongoose = require('mongoose'); //Allows us to work with our database (mongoDB)

```
Next, we're going to create our first schema. A schema is how we define the rules for what types of variables we'll allow in our model. In this case, we're making a schema for Reviews. We want to save a score (like  5/10 stars) and some text for each review. 

When defining a schema, we first define the name of the field we're creating (in this case, "body" and "score"). Next we define the type of variable for that field (in this case, String and Number). Finally, we can provide some rules about what kinds of values to accept. For each validation rule, we have to provide an error message that will be shown if that rule fails. For example, if the user submitted a score that was less than 0, we would send back the error message "Score must be between 0 and 10". 

Go ahead and add this code to your `movie.js` file:

```javascript
/*
 * A schema is like a blueprint for things we 
 * want to insert into the database. Here we 
 * define what information we want to store
 * about each Movie Review. We also create
 * rules about what sorts of data is allowed.
 */
var reviewSchema = new mongoose.Schema({
  body: {
  	type: String,
  	required: [true, "Missing Review Body"]
  },
  score: {
  	type: Number,
  	required: [true, "Missing Review Score"],
  	min: [0, "Score must be between 0 and 10"],
  	max: [10, "Score must be between 0 and 10"],
  }
});
```

Next we're going to make another schema for Movies. Movies will have a title, a description, and an array of reviews. A movie can have a link to an image, but it's not required. The [bracket] notation lets mongoose know we want the "reviews" field to be an array of reviews instead of just one review.  Add this code to your `movie.js` file:


```javascript
/*
 * Now we define the movie Schema.
 * Each movie will contain an array of 
 * reviews, so we add that here. 
 */
var movieSchema = new mongoose.Schema({
  title: {
  	type: String,
  	required: [true, "Missing Title"]
  },
  description: {
  	type: String,
  	required: [true, "Missing Description"]
  },
  reviews: [reviewSchema]
});
```

Here we use the `mongoose.model()` function to turn our schema into a model called "Movie". Then we take the value that gets returned and save it to `module.exports`. This means that we can call `require()` in a different file to load this movie model. Add this code to the end of your `movie.js` file to finish things up. 

```javascript
/*
 * Now we take our movie schema and turn
 * it into a model for mongoose to use.
 * We use module.exports so we can require() 
 * this model into other files. 
 */
module.exports = mongoose.model('Movie', movieSchema);
```


##Seeding the Database
When we're working on a project with a database, it's nice to be able to quickly add some sample entries to the database for testing. This way, if you ever make a mistake or mess up your database, it's easy to reset. This is called seeding the database, and it's pretty easy to do.  

To help you debug the project, we've provided you with a seeder file called `seeder.js`. To run this seeder, we can just type `node seeder.js` into the terminal. You should see a message about documents being added. If you get "Error: connect ECONNREFUSED", it means that mongod is not running in the background. Make sure that mongod is running in another terminal window.  

Now that your database has entries, it's time to actually do something with them!