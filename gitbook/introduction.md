# Introduction

### What is an API?
 An API stands for "Application Programming Interface".  An API is a list of commands as well as the format of those commands that one program can send to another. This allows us to use the hard work of people *way* smarter than us so that we can do some pretty cool stuff.  Using an API lets us use the information that would otherwise be way harder to get through a simple command.  
  
### What is a RESTful API
 REST stands for "Representational State Transfer".  This sounds super confusing, but simply put, it is just a standardized way of transferring data.  That means that you can use any programming language to access the same information.  Formats include JSON, XML and more.  We'll be focusing on JSON.
  
### JSON
 JSON stands for "JavaScript Object Notation".  As a heads up, the JSON format is not just limited to Javascript (you can use Python, Ruby etc. to send JSON objects).  It uses Javascript syntax, but it is just a bunch of text being sent.
  
```javascript
  {"employees":[
    {"firstName":"John", "lastName":"Doe"},
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
]}
```

## How do you use this you ask?

### POST and GET
 These are the two basic requests that you make to an API.  When you POST something, you send information to the API.  For example, a POST request can send a tweet using the Twitter API to my Twitter account.  On the other hand, a GET request retreives information from the API.  In this case, a GET request can grab my entire Twitter feed using the Twitter API.  
 
 You can perform any combination of create, read, update and delete (CRUD) operations using a series of POST and GET requests to do anything!  All you have to do is look up the correct requests from the API documentation, and provide the correct parameters to execute it.