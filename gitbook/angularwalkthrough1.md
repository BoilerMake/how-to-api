# Angular Walkthrough- Part 1

# Angular Setup
1. Download Skeleton

2. Install dependencies

One directory outside of `/backend`, run this command in your terminal:

```
bower init
```

This will create a `bower.json` file to store your front-end dependencies. Press enter multiple times to go with the defaults.

Install angular and bootstrap:

```
bower install --save angular
bower install --save bootstrap
```
The `--save` will store these packages in your `bower.json`. That way, when another user wants to download your app, they only need this file to run `bower install` and all of the packages in this file will be included in the project.

#Getting Started
Open your `app.js` file inside of the `app` folder.

  Create a module called `movies`:

```javascript
var app = angular.module('movies', []);
```

Next, create a controller called `MoviesController`:

```javascript
app.controller("MoviesController", function() {});
```

Angular has a really nice feature called dependency injection. This means that Angular will automatically provide us with services that we ask for. You can think of it a little bit like `require()` in node. We will be using the $http service, so we will add it to our controller function: 

```javascript
app.controller("MoviesController", ['$http', function($http) {}]);
```
Don't forget all of the brackets! 

Before we add logic to the controller, we need to do a few things to the `index.html` file. This will let our html communicate with the angular code in `app.js`. We need to let angular know that we want to use the movies module we created earlier. In your `<html>` tag at the very top, add:

```html
<html ng-app='movies'>
```


Now we need to let angular know which controller we want to use. We add the ng-controller attribute to the `<body>` tag: 

```html
<body class='gradient-background' ng-controller='MoviesController as collection'>
```
`collection` is the alias we will use to refer to the controller. You can think of it like a nickname we're giving to the controller so it's easy to reference. 

Normally you would need to add html tags to include the angular library, but we've already included it in the skelleton code.
