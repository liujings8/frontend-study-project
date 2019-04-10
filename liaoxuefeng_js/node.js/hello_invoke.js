'use strict';
//引入hello模块
//var greet = require('hello');//Node 会依次在内置模块、全局模块和当前模块下查找hello.js
var greet = require('./hello');//不要忘了写相对路径
var s = 'Michael';
greet(s);

//这种模块加载机制称为CommonJS规范。
//在这个规范下，每个.js文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，
//例如，hello.js和main.js 都申明了var s = 'xxx',但互不影响。
//一个模块想要对外暴露变量(函数也是变量),可以用module.exports = variable;，
//一个模块要引用其他模块暴露的变量，用var ref = require('module_name');就拿到了引用模块的变量

//实现模块功能的奥秘就在于Javascript是一种函数式编程语言，它支持闭包。
//把一段javascript代码用函数包装起来，这段代码的所有"全局"变量就变成了函数内部的局部变量

var s = 'hello';
var name = 'world';
console.log(s + ' ' + name + '!');

(function() {
	var s = 'hello';
	var name = 'world';
	console.log(s + '' + name + '!');
})();

//模块的输出module.export怎么实现

//准备module对象
var module = {
	id: 'hello',
	export: {}
};

var load = function(module) {
	//读取hello.js代码;
	function greet(name) {
		console.log('Hello,' + name + '!');
	}
	module.exports = greet;
	//heelo.js代码结束
	return module.exports;
};

var exported = 

