console.log('current js file：' + __filename);
console.log('current js dir：' + __dirname);
process.name = 'Sample Nodejs';
console.log('arguments：' + JSON.stringify(process.argv));
console.log('cwd：' + process.cwd());

var d = '/private/tmp';
if(process.platform === 'win32'){
	d = 'C:\\Windows\\System32';
}
process.chdir(d);
console.log('cwd：' + process.cwd());

//process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
	console.log('nextTick callback!');
});
console.log('nextTick was set!');

//程序即将退出时的回调函数
process.on('exit', function (code) {
	console.log('about to exit with code：' + code);
});