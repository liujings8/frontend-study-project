var fn_signin = async (ctx, next) => {
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    // console.log(`signin with name：${email}, password：${password}`);
    if (email === 'admin@example.com' && password === '123456') {
        //登陆成功:
        ctx.render('signin-ok.html', {
            title: "Sign In Ok",
            name: "Mr node"
        });
    } else {
        //登陆失败:
        ctx.render('signin-failed.html', {
            title: "Sign In Failed"
        });
    }
};
/*
由于登录请求是一个POST请求，我们就用ctx.request.body.<name>拿到POST请求的数据，并给一个默认值。
登录成功时我们用signin-ok.html渲染，登录失败我们用signin-failed.html渲染，所以，我们一共需要以下3个View
1. index.html
2. signin-ok.html
3. signin-failed.html
*/

module.exports = {
    'POST /signin': fn_signin
}