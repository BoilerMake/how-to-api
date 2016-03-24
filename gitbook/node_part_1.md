# Node Walkthrough- Express 

Alright, now it's time to get coding! We're going to create a server than can respond to our client. Since we don't have a client yet, we will test our app using Postman. 

If you don't have one already, you should create a file called `server.js`. This will be the heart of our application. You should already have a file called `seeder.js`, but don't worry about that for now. 

We're going to need a few different libraries for this project. To save us time later, we'll just install them all now. Run these commands in your terminal: 

```
npm init
npm install express body-parser mongoose cors node-env-file  --save
```

When you run npm init, you can just keep tapping enter to go with the default options. After both commands finish, you should see a new package.json file and a new folder called node_modules. 


##Creating our Express.js server

First things first, copy the following code into `server.js` to get started. Then we'll break it down and explain how it all works. 


```javascript
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
var env = require('node-env-file'); //Allows us to set enviornment variables

env('.env'); //Load enviornment variables from our .env file into process.env

/*
 * Create our express application, set the port and ip address, 
 * and then configure out express app to work with bodyParser
 * so we can read from post data.
 */
var app = express(); //Initialize an Express application, save it to a variable
app.set('port',(process.env.PORT || 8080)); //If we set a port we set in our .env file use that, otherwise use 8080
app.set('ip',(process.env.IP || "localhost")); //If we set a port we set in our .env file use that, otherwise use 8080

//Set up a simple route for
app.get('/',function(request,response) {
	response.send("Hello World!");
});



/*
 * Run the server and use the port we set earlier. 
 * The anonymous function we pass pas the second argument 
 * will be run once the server is ready.
 */
var server = app.listen(app.get('port'),app.get('ip'),function() {
	//Once the server is running, print a message so we know it's alive.
    console.log("Server is listening on port "+app.get('port')+" and ip "+app.get('ip'));
});
```

That looks like a lot of code, but it's not too bad once we break it down. Take a look at each section: 

```javascript
var express = require('express'); //Express lets us create a server with routes
var env = require('node-env-file'); //Allows us to set enviornment variables

env('.env'); //Load enviornment variables from our .env file into process.env
```
This section just loads the libraries we downloaded earlier with npm and stores them into variables so we can use them later.  Next, we call the env library we just loaded and tell it to look for any settings we may have placed in the `.env` file. For now, we should have an empty `.env` file. 


```javascript
var app = express(); //Initialize an Express application, save it to a variable
app.set('port',(process.env.PORT || 8080)); //If we set a port we set in our .env file use that, otherwise use 8080
app.set('ip',(process.env.IP || "localhost")); //If we set a port we set in our .env file use that, otherwise use 8080
```
Here we create an express server and store it in the app variable. A server needs an ip address and a port to run on, so we tell it to use the ip and port we specify in our `.env` file. If we haven't specified anything, then we default to 8080 for the port and localhost for the ip. Cloud9 will automatically sets these variables for us, so we don't need to worry about them. 

```javascript
//Set up a simple route for
app.get('/',function(request,response) {
	response.send("Hello World!");
});
```
This code sets up a route for our application. When the user visits the root (the "/") address of our server, we'll send back a "Hello World" message. 

```javascript
var server = app.listen(app.get('port'),app.get('ip'),function() {
	//Once the server is running, print a message so we know it's alive.
    console.log("Server is listening on port "+app.get('port')+" and ip "+app.get('ip'));
});
```
Finally, we start up our server. We start listening on the port and ip we set up earlier, and then when the server is running we print a message so we can see it's working. We save the server into a variable in case we need it later. 


Because we're working in cloud9, we need to tell it how to run our server. Click on the run menu and make sure the command is set to `server.js`. If it is, click the green run button to start your server!


![](http://i.imgur.com/XKogvvf.png)


To test your server, you can click the link that's shown in the terminal. You should see your hello world! If you wanted to, you could also use Postman to do the same thing. 
