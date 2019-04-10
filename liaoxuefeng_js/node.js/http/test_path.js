'use strict';

//处理本地文件目录需要使用Node.js提供的path模块,它可以方便地构造目录:

var path = require('path');

//解析当前目录
var workDir = path.resolve('.');//'Users/michael'

//组合完整的文件路径:当前目录+'pub'+'index.html';
var filePath = path.join(workDir, 'pub', 'index.html');
// 'Users/michael/pub/index.html'