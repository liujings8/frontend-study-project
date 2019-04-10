'use strict';
var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

//从命令行参数获取root目录，默认时当前目录
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir：' + root);

//创建服务器:
var server = http.createServer(function (request, response) {
    //获得 URL的path,类似 '/css/bootstrap.css';
    var pathname = url.parse(request.url).pathname;
    //获取对应的本地文件的路径，类似 '/srv/www/css/boostrap.css'
    var filepath = path.join(root, pathname);
    //获取文件状态
    fs.stat(filepath, function (err,stats) {
        if (!err && stats.isFile()) {
            //没有出错并且文件存在
            console.log('200' + request.url);
            //发送200响应
            response.writeHead(200);
            //将文件流导向response;
            fs.createReadStream(filepath).pipe(response);
        } else if(!err && !stats.isFile()){
            //请求的路径是目录，则自动在目录下依次搜索index.html、default.html
            fs.stat(path.join(filepath, 'index.html'), function (err1, stats1) {
                if (!err1 && stats1.isFile()) {
                    response.writeHead(200);
                    fs.createReadStream(path.join(filepath, 'index.html')).pipe(response);
                } else {
                    fs.stat(path.join(filepath, 'default.html'), function (err2, stats2) {
                        if (!err2 && stats2.isFile()) {
                            response.writeHead(200);
                            fs.createReadStream(path.join(filepath, 'default.html')).pipe(response);
                        }else{
                            //出错或者文件不存在
                            console.log('404' + request.url);
                            //发送404响应
                            response.writeHead(404);
                            response.end('404 Not Found');
                        }
                    }); 
                }
            });
        } else {
            //出错或者文件不存在
            console.log('404' + request.url);
            //发送404响应
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080');
