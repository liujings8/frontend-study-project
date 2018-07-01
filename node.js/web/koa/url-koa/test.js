/**
 * 正常情况下，我们应该对不同的URL调用不同的处理函数，这样才能返回不同的结果。例如像这样写：
 */
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.body = 'index page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/test') {
        ctx.response.body = 'TEST page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/error') {
        ctx.response.body = 'ERROR page';
    } else {
        await next();
    }
});

/**
 * 这么写可以运行的，但是好像有点蠢。
 * 因该有一个能集中处理URL的middleware，它根据不同的URL调用不同的处理函数，
 * 这样，我们才能专心为每个URL编写处理函数。
 */

/**
 * koa-router
 */
//为了处理URL,我们需要引入koa-router这个middleware，让它负责处理URL映射。