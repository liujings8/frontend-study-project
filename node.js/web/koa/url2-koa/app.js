const Koa = require('koa');

//导入controller middleware
const controller = require('./controller');

const bodyParser = require('koa-bodyparser');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//此处主要是boduParser() 函数
//由于middleware的顺序很重要，这个koa-bodyparaser必须在router之前注册到app对象上。
// parse request body
app.use(bodyParser());

//使用middleware
//add controllers
app.use(controller());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000');