var spinner = require("char-spinner");
var async = require("async");
spinner();

var dataSize = 1000;


async.series([
	/* == INSERT == */
	function(callback){
		require('./mysql')('insert',dataSize,callback);
	},
	function(callback){
		require('./mongo')('insert',dataSize,callback);
	},
	/* == SELECT == */
	function(callback){
		require('./mysql')('find',dataSize,callback);
	},
	function(callback){
		require('./mongo')('find',dataSize,callback);
	}
],function(){
	process.exit();
})
