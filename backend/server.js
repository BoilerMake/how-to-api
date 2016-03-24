/*
 * ==============================================================================
 * This is our main server file. We can run it with "node server.js".
 * It creates a webserver using express, configures port/ip settings,
 * and then creates our routes. 
 * ==============================================================================
 */


/*
 * Here we import all the dependencies we need. 
 * We can install these dependencies with npm. 
 * These are tools that will make our lives easier.
 */
var express = require('express'); //Express lets us create a server with routes
var bodyParser = require('body-parser'); //BodyParser allows us to easily parse data for POST requests
var env = require('node-env-file'); //Allows us to set enviornment variables
var mongoose = require('mongoose'); //Allows us to work with our database (mongoDB)
var cors = require('cors'); //Allows our server to respond to requests from other servers


env('.env'); //Load enviornment variables from our .env file into process.env
mongoose.connect(process.env.MONGODB); //Connect to our database using the address we set in .env

mongoose.connection.on('error',console.error.bind(console, 'Mongoose connection error:'));
mongoose.connection.once('open',function(){
	console.log("Mongoose connected");
});

/*
 * Create our express application, set the port and ip address, 
 * and then configure out express app to work with bodyParser
 * so we can read from post data.
 */
var app = express(); //Initialize an Express application, save it to a variable
app.set('port',(process.env.PORT || 8080)); //If we set a port we set in our .env file use that, otherwise use 8080
app.set('ip',(process.env.IP || "localhost")); //If we set a port we set in our .env file use that, otherwise use 8080

/*
 * Set up middleware on our application using the modules we loaded earlier.  
 */
app.use(bodyParser.urlencoded({extended: true})); //Use bodyParser to read x-www-form-urlencoded data (like in Postman)
app.use(bodyParser.json()); //Use bodyParser to read JSON data
app.use(cors()); //Allow requests from other servers


/*
 * Connect our routes to functions in the controller we just loaded.
 * We can use app.get() or app.post() to create routes for get or post requests.
 * We pass in the url for the route, and then the function to handle it. 
 */
mainController = require('./controllers/mainController.js'); //Load the controller we made earlier from the /controllers folder
mainController.setupRoutes(app); //Run the setup method from the main controller


listRoutes(); //Print the routes so we can check that things are working

/*
 * Run the server and use the port we set earlier. 
 * The anonymous function we pass pas the second argument 
 * will be run once the server is ready.
 */
var server = app.listen(app.get('port'),app.get('ip'),function() {
	//Once the server is running, print a message so we know it's alive.
    console.log("Server is listening on port "+app.get('port')+" and ip "+app.get('ip'));
});


/*
 * This function prints a list of all active routes for your application. 
 * Call this to make sure you have things set up correctly. 
 */
function listRoutes() {
	console.log("\nListing your routes:" +
		"\n-----------------------------------\n" +
		"ACTION \t| URI \n" +
		"-----------------------------------");
	app._router.stack.forEach(function(r){
		if (r.route && r.route.path){
			console.log(r.route.stack[0].method.toUpperCase()+" \t"+r.route.path)
		}
	});
	console.log("-----------------------------------\n");
}