var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    console.log(ctx.request.path);
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

// hello.js 把一个URL处理函数暴露出来
module.exports = {
    'GET /hello/:name': fn_hello
};