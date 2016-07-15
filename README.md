# [How-To-API] (https://boilercamp.gitbooks.io/boilercamp2016/content/)

A (more or less) working introduction to working with the MEAN stack. This tutorial covers [Node.js](https://nodejs.org/en/), [AngularJS](https://angularjs.org/), [MongoDB](https://www.mongodb.org/).

## The Walkthrough
This project is set up in 3 main parts, which you can view [here](https://boilercamp.gitbooks.io/boilercamp2016/content/). You'll start by using the [Postman](https://www.getpostman.com/) chrome extension to work with Twitter's API. Next, you'll use Node to create your very own API. Along the way, you'll learn to work with [Mongoose](http://mongoosejs.com/) and [MongoDB](https://www.mongodb.org/). Finally, you'll create a frontend with [AngularJS](https://angularjs.org/) and integrate it with the your API. 

You can download the full presentation slides [here](https://github.com/BoilerCamp/how-to-api/raw/master/Complete%20Slides.pdf). 

## Running the Project
This repo represents the finished version of the product after all of the walkthroughs are finished. If you want to see how it looks, you can do the following: 

1. Make sure you have npm and bower installed. In Cloud9, npm is pre-installed, and you can install bower by running `npm install bower -g`. 
2. In the backend folder, run `npm install`
3. In the backend folder, rename the sample env file to `.env`
4. In the frontend folder, run `bower install`
5. Run `mongod`. This should be pre-installed in Cloud9, but you'll need to install it yourself if you're working on your own machine. 
6. In the backend folder, run `node seeder.js` and then run `node server.js`
7. In the frontend folder, run `http-server ./ -p 8081`
8. Visit `localhost:8081` and view the running app!

## Thanks
We owe a huge thanks to the entire BoilerCamp team, and all the volunteers who helped at the event!

### License
All code in this repository is released under AGPL v3. See [LICENSE.md][license] for details. All educational material (e.g. slides) is released under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

[license]: LICENSE.md
