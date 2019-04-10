/**
 * 首先，我们创建一个目录hello-koa并作为工程目录用VC Code打开，然后，我们创建app.js,输入一下代码：
 */
// 导入koa,和koa 1.x 不同，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
//创建一个Koa对象表示web app本身:
const app = new Koa();

//对于任何请求,app将调用该异步函数处理请求:
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello world!</h1>';
});

//在端口3000监听
app.listen(3000);
console.log('app start at port 3000...');