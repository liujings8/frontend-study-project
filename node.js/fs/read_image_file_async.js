'use strict';

// read from 'sample.png'

var fs = require('fs');

console.log('<<< BEGIN >>>');

var data = fs.readFile('sample.png', function (err, data) {
	if(err){
		console.log(err);
	}else{
		console.log(data);
		console.log(data.length + ' bytes');
	}
});

console.log('<<< END >>>');	


