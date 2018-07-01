function hello() {
	console.log('Hello Wolrd');
}

function greet(name) {
	console.log('Hello,' + name + '!');
}

module.exports = {
	hello: hello,
	greet: greet
};
