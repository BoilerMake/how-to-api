# [How-To-API] (https://boilercamp.gitbooks.io/boilercamp2016/content/)

A (more or less) working introduction to working with the MEAN stack. This tutorial covers [Node.js](https://nodejs.org/en/), [AngularJS](https://angularjs.org/), [MongoDB](https://www.mongodb.org/).

##The Walkthrough
This project is set up in 3 main parts, which you can view [here](https://boilercamp.gitbooks.io/boilercamp2016/content/). You'll start by using the [Postman](https://www.getpostman.com/) chrome extension to work with Twitter's API. Next, you'll use Node to create your very own API. Along the way, you'll learn to work with [Mongoose](http://mongoosejs.com/) and [MongoDB](https://www.mongodb.org/). Finally, you'll create a frontend with [AngularJS](https://angularjs.org/) and integrate it with the your API. 

##Running the Project
This repo represents the finished version of the product after all of the walkthroughs are finished. If you want to see how it looks, you can do the following: 

1. In the backend folder, run `npm install`
2. In the backend folder, rename the sample env file to `.env`
3. In the frontend folder, run `bower install`
4. Run `mongod`
5. In the backend folder, run `node seeder.js` and then run `node server.js`
6. In the frontend folder, run `http-server ./ -p 8081`
7. Visit `localhost:8081` and view the running app!

##Thanks
We owe a huge thanks to the entire BoilerCamp team, and all the volunteers who helped at the event!
