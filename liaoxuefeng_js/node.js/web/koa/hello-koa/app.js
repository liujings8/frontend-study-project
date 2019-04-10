// 导入koa,和koa 1.x 不同，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
//创建一个Koa对象表示web app本身:
const app = new Koa();

//每收到一个http请求，koa就会调用通过app.use() 注册的async函数，并传入ctx和next参数
/*
 *koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，
 * 然后用await next()来调用下一个async函数。
 * 我们把每个async函数成为middleware,这些middleware可以组合起来，完成很多有用的功能。 
 */
//middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
//此外,如果一个middleware没有调用await next(),后续的middleware将不再执行了。
//例如,可以用以下3个middleware组成处理链，依次打印日志，记录处理时间，输出HTML:

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);//打印URL
    await next();//调用下一个middleware
}); 

app.use(async (ctx, next) => {
    const start = new Date().getTime();//当前时间
    await next();//调用下一个middleware
    const ms = new Date().getTime() - start;//耗费时间
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);//打印耗费时间
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

//对于任何请求，app将调用该异步函数处理请求:
app.use(async (ctx, next) => {//next是koa传入的将要处理的下一个异步函数
    //await next() 处理下一个异步函数
    await next();
    //设置response的Content-Type:
    ctx.response.type = 'text/html';
    console.log('Hello World');
    //设置response的内容:
    ctx.response.body = '<h1>Hello, Koa2!</h1>';
});

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');

