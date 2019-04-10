'use strict';

var fs = require('fs');

console.log('<<< BEGIN >>>');

var data = 'Hello, node.js';

fs.writeFile('output.txt', data, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('ok.');
	}
});

console.log('<<< END >>>');