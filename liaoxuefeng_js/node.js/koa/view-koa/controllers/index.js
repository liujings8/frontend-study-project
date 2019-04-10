var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
};
/*
注意到koa并没有在ctx对象上提供render方法,这里假设应该这么使用，这样，我们在编写Controller的时候，
最后一步调用ctx.render(view, model)就完成页面输出。
*/

module.exports = {
    'GET /': fn_index
};