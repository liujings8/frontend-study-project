// 导入koa，和koa 1.x 不同，在koa2中，我们导入的一个class，因此用大写的Koa表示:
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

//注意require('koa-router')返回的是函数
//相当于
// const fn_router = require('koa-router');
// const router = fn_router();
const router = require('koa-router')();

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

//add url-route
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action= "/signin" method= "post" >
            <p>Name：<input name="name" value=""></p>
            <p>Password：<input name="password" type="password"></p>
            <p><input type="submit" value="submit"></p> 
        </form>`;
});

//用router.get('/path', async fn)处理的是get请求。如果要处理post请求,可以用router.post('/path', async fn).
/**
 * 用post请求处理URL时，我们会遇到一个问题:post请求通常会发送一个表单，或者JSON，它作为request的body发送，
 * 但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
 * 所以,我们又需要引入另一个middleware来解析原始request请求，
 * 然后，把解析后的参数，绑定到ctx.request.body中,koa-bodyparser就是用来干这个活的。
 */

router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    /*
        注意到我们用var name = ctx.request.body.name || '' 拿到表单的name字段，
        如果该字段不存在，默认值设置为''。
        类似的，put、delete、head请求也可以由route处理
    */
    console.log(`signin with name：${name}, password：${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

//add router middleware
app.use(router.routes());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000');

/*
重构,我们已经可以处理不同的URL了，但是看看app.js,总感觉还是有点不对劲。
所有的URL处理函数都放到app.js里显得很乱，而且，每加一个URL,就需要修改app.js。
随着URL越来越多，app.js就会越来越长    
*/
/*
所有的URL处理函数集中到某个js文件，或者某几个js文件中就好了，然后app.js自动导入所有处理
URL的函数。这样，代码一分离，逻辑就显得清楚了。
*/