# Postman Activity

### Introduction
 This will be a quick activity to teach you how to use Postman to make and send POST and GET requests.  

### What you need
 1. Postman.  If you haven't downloaded it already, go ahead and go to the previous page (Postman) and download it there!
 2. A Twitter account.  If you don't have a Twitter account, or would like use an alternate account, please go to [Twitter](https://twitter.com) and make one.
 3. The [Twitter API documentation](https://dev.twitter.com/overview/documentation) handy.  Go ahead and go to the [REST API](https://dev.twitter.com/rest/public) section since that is what we will be using.

### Activity
1. Set up Oauth
2. Make a tweet at @Boilercamp!
3. Grab all the tweets from @Boilercamp!
4. Play around with some other requests

### How to Set Up Oauth
1.  Go to [this link](apps.twitter.com) which is the Twitter Application Management page, and "Create New App"
![Alt Text](http://i.imgur.com/MJ1Omuw.png)
2.  Fill out the details required and go ahead an accept the Terms and Services.
![Alt Text](http://i.imgur.com/IZVFP5z.png)
3.  Go to the "Keys and Access Tokens" Tab.  You should already have a Consumer Key (API Key) and Consumer Secret (API Secret) already generated.
![Alt Text](http://i.imgur.com/GAZpuPy.png)
4.  While still on that page you need to create your own Access Token which you will find a button towards the bottom of the page.
![Alt Text](http://i.imgur.com/9yso6tdg.png)
5.  Keep all 4 details secret!  
6.  Now open up Postman, and go the authorization tab.  Select OAuth 1.0 (That's what Twitter uses).
![Alt Text](http://i.imgur.com/spkJxC7g.png)
7.  Fill in the 4 details from Step 5 into their respective spots.
![Alt Text](http://i.imgur.com/lvScLkLg.png)
8.  Make sure to check off "Add Params to the Header"!
![Alt Text](http://i.imgur.com/NMAiX47.png)
9.  You have successfully set up OAuth on Postman to make requests to the Twitter API!

### How to Make an API Call
1.  Go to the [Twitter API](dev.twitter.com) and find the correct request you want to make.
2.  Copy paste the "Resource URL" that the documentation says to use
![Alt Text](http://i.imgur.com/VmiAfa6.png)
3.  Fill in the correct parameters (if needed).  Click "Params" to the right of the URL box, and insert the parameter (i.e. user) and the value (i.e. Boilercamp).
![Alt Text](http://i.imgur.com/FLWgUXI.png)
4.  Update the Request
5.  Make sure to change it to the correct request type, POST or GET
6.  Send it!

### If You Would Like to Watch a Scottish Guy Explain All of This
[Click Here for a Youtube Video Explaining the Above!](https://www.youtube.com/watch?v=fhPb6ocUz_k)

### Takeaways
1. What an API is
2. How to use an API
3. What Postman is