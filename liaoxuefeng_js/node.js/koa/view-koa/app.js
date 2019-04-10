const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

//导入controller middleware
const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

/**
 * 这里我们定义一个常量，它判断当前环境是否是production环境。
 * 如果是，就使用缓存，如果不是，就关闭缓存。
 * 在开发环境下，关闭缓存后，我们修改view，可以直接刷新浏览器看到效果，
 * 否则，每次修改都必须重启Node程序，会极大降低开发效率。
 */
const isProduction = process.env.NODE_ENV === 'production';

//第一个middleware是记录URL及页面执行时间
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
    execTime;
    await next();
    execTime = new Date().getTime - start; 
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//第二个middleware处理静态文件
//static file support
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static')); 
}

//此处主要是boduParser() 函数
//由于middleware的顺序很重要，这个koa-bodyparaser必须在router之前注册到app对象上。
//第三个middleware解析POST请求
// parse request body
app.use(bodyParser());

//add nunjucks as view
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//最后一个middleware处理URL路由
//add controllers
app.use(controller());

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000');