/*
 * ==============================================================================
 * This is our main server file. We can run it with "node server.js".
 * It creates a webserver using express, configures port/ip settings,
 * and then creates our routes. 
 * ==============================================================================
 */





//TODO- Your Code Here :) 










/*
 * This function prints a list of all active routes for your application. 
 * If you're having problems, calling this might help you debug.  
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