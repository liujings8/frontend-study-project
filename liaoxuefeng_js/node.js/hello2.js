function hello() {
	console.log('Hello Wolrd');
}

function greet(name) {
	console.log('Hello,' + name + '!');
}

exports.hello = hello;
exports.greet = greet;
