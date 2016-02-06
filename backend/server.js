var express = require('express');


var app = express();
app.set('port',(process.env.PORT || 8080)); //Default to 8080 if no port specified

app.get('',function(req,res) {
	res.send("Hello World!");
})

var server = app.listen(app.get('port'),function(){
    console.log("Server is listening on port "+app.get('port'));
});
