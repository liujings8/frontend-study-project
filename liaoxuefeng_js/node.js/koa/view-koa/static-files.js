//处理静态文件
/*
我们所有的静态资源文件全部放在/static目录，目的是能统一处理静态文件。
在koa中，我们需要编写一个middleware，处理以/static/开头的URL。
*/

//创建一个static-files.js的文件，编写一个能处理静态文件的middleware:

const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

//url 类似 '/static'
//dir 类似 __dirname + '/static'
function staticFiles (url, dir) {
    return async (ctx, next) =>{
        let rpath = ctx.request.path;
        // console.log("rpath:"+rpath);
        //判断是否以指定的url开头
        //注意 startWith 'W'大写
        if (rpath.startsWith(url)) {
            console.log("rpath:"+rpath);
            // 获取文件完整路径
            let fp = path.join(dir, rpath.substring(url.length));
            //判断文件是否存在
            /*
                为了简化异步代码，ES7(目前是草案，还没有发布)引入了新的关键字async和await，
                可以轻松地把一个function变为异步模式
                async function () {
                    var data = await fs.read('/file1');
                }
                这是JavaScript未来标准地异步代码，非常简洁，并且易于使用
            */
            if (await fs.exists(fp)) {
                //查找文件的mime
                ctx.response.type = mime.lookup(rpath);
                //读取文件内容并赋值给response.body
                ctx.response.body = await fs.readFile(fp);
            } else {
                //文件不存在
                ctx.response.status = 404;
            }
        } else {
            //不是指定前缀的URL,继续处理下一个middleware
            await next();
        }
    };
};

module.exports = staticFiles;

/*
staticFiles是一个普通函数，它接收两个参数：URL前缀和一个目录，然后返回一个async函数。
这个async函数会判断当前URL是否以指定前缀开头，如果是，就把URL的路径视为文件，并发送文件内容。
如果不是，这个async函数就不做任何事情，而是简单地调用await next()让下一个middlewared去处理请求。
*/

/*
我们使用了一个mz的包，并通过require('mz/fs');导入。
mz提供的API和Node.js的fs模块完全相同，但fs模块使用回调,而mz封装了fs对应的函数，并改为Promise。
这样我们就可以非常简单的使用mz的函数，而不需要任何回调。
*/
