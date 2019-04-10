/*
集成Nunjucks实际上也是编写一个middleware,这个middleware的作用是给ctx对象
绑定一个render(view, model)的方法，这样，后面的Contorller就可以调用这个方法来渲染模板了。
*/
const nunjucks = require('nunjucks');
function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        );
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    //创建Nunjucks的env对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        //给ctx绑定render对函数
        ctx.render = function (view, model) {
            //把render后的内容赋值给response.body
            /**
             * 扩展
             */
            /**
             * 注意到ctx.render内部渲染模板时，Model对象并不是传入的model变量，而是：
             * Object.assign({}, ctx.state || {}, model || {})
             * 这个小技巧是为了扩展
             */
            /**
             * 首先，model || {} 确保了即使传入undefined，model也会变成默认值{}。
             * Object.assign()会把除第一个参数外的其它参数的所有参数的所有属性复制到第一个参数中。
             * 第二个参数是ctx.state || {},这个目的是为了能把一些公共的变量放入ctx.state并传给View。
             */
            /**
             * 例如，某个middleware负责检查用户权限，
             * 它可以把当前用户放入ctx.state中：
             */
            // app.use(async (ctx, next) => {
            //     var user = tryGetUserFormCookie(ctx.request);
            //     if (user) {
            //         ctx.state.user = user;
            //         await next();
            //     } else {
            //         ctx.response.status = 403;
            //     }
            // });
            //这样就没有必要在每个Controller的async函数中都把user变量放入model中。
            /**
             * 
             * 
             * 
             */
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            //设置Content-Type
            ctx.response.type = 'text/html';
        };
        //继续处理请求
        await next();
    };
}

/**
 * 注意到createEnv()函数和前面使用Nunkucks时编写的函数是一模一样的。
 * 我们主要关心templating函数，它会返回middleware，在这个middleware中，
 * 我们只给ctx"安装"了一个render函数，其他什么事情也没干，就继续调用下一个middleware
 */

module.exports = templating;