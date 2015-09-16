var self = {};

self.start = process.hrtime;

self.end = function(note){
	if(!note) note = '';
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(self.start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(self.start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    self.start = process.hrtime(); // reset the timer
}


module.exports = self;
