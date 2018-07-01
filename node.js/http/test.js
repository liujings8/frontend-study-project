/**
 * Node.js开发的目的就是为了用JavaScript编写Web服务器程序，
 * 因为JavaScript实际上已经统治了浏览器的脚本，其优势就是有世界上数量最多的前端的开发成员。如果已经掌握了
 * JavaScript前端开发，在学习一下如何将JavaScript应用在后端开发，就是名副其实的全栈了。
 */

//用Node.js实现一个HTTP服务器程序非常简单，
//我们来实现一个简单的Web程序hello.js,它对于所有请求，都返回Hello world!:
'use strict';
var http = req
uire('http');
var server = http.createServer(function (request, response) {
    //回调函数接收request和response对象，
    //获得HTTP请求的method和url：
    console.log(request.method + ': ' + request.url);
    //将HTTP响应200写入response，同时设置COntent-Type:text/html:
    response.writeHead(200, { 'Content-Type': 'text/html' });
    //将HTTP响应的HTML的内容写入response:
    response.end('<h1>Hello world!</h1>');
});

//让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');


/**
 * 文件服务器
 */
/**
 * 让我们继续扩展一下上面的Web程序。我们可以设定一个目录，
 * 然后让Web程序变成一个文件服务器。要实现这一点，我们只需要解析request.url的路径，
 * 然后在本地找到对应的文件，把文件内容发送出去就可以了。
 */
/**
 * 解析URL需要用到Node.js提供的url模块，它使用起来非常简单，
 * 通过parse()将一个字符串解析为一个Url对象:
 */
'use strict';
var url = require('url');
console.log('http://user.pass@host.com:8080/path/to/file?query=string#hash');

/**
 * 处理本地文件需要使用Node.js提供的path模块，它可以方便地构造目录:
 */
'use strict';
var path = require('path');
//解析当前目录
var workDir = path.resolve('.');//'/Users/michael'

//组合完整地文件路径：当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');
//'/Users/michael/pub/index.html'

/**
 * 使用path模块可以正确处理操作系统相关的文件路径。
 * 在Windows系统下,返回的路径类似下C:\Users\michael\static\index.html,
 * 这样，我们就不关心怎么拼接路径了。
 */
//最后我们实现一个文件服务器file_server.js：
'use strict';
var fs = require('fs');
url = require('url');
path = require('path');
http = require('http');

//从命令行参数获取root目录，默认是当前目录：
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

//创建服务器：
var server = http.createServer(function (request, response) {
    //获得URL的path，类似 'css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    //获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    //获取文件状态：
    fs.stat(filepath, function (err, stats) {
        if(!err && stats.isFile()){
            //没有出错并且文件存在：
            console.log('200 '+ request.url);
            //发送200响应：
            resonse.writeHead(200);
            //将文件流导向response：
            fs.createReadStream(filepath).pipe(response);
        }else{
            //出错了或者文件不存在：
            console.log('404 '+request.url);
            response.writeHead(404);
            response.end('404 not Found');
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');

/**
 * 没有必要手动读取文件内容。由于response对象本身是一个Writeable Stream，
 * 直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
 */
/**
 * 在命令行运行node file_server.js /path/to/dir,把/path/to/dir改成你本地的一个有效的目录，
 * 然后在浏览器中输入http://localhost:8080/index.html:
 * 只要当前目录下存在文件index.html服务器就可以把文件内容发送给浏览器。
 * 观察控制台输出：
 */

/**
 * 200 /index.html
 * 200 ./css/uikit.min.css
 * 200 /js/jquery.min.js
 * 200 /fonts/fontawesome-webfont.woff2
 */
/**
 * 第一个请求是浏览器请求index.html页面，后续请求是浏览器解析HTML后发送的其它资源请求。
 */


/**
 * 练习
 */
/**
 * 在浏览器输入http://localhost:8080/时，会返回404，原因是程序识别出HTTP请求的不是文件，而是目录。
 * 请修改file_server.js，如果遇到请求的路径是目录，则自动在目录依次搜索index.html、default.html,
 * 如果找到了，就返回HTML文件的内容
 * 
 */
