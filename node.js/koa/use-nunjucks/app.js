const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            //使用new nunjucks.FileSystemLoader('views')
            //创建一个文件系统加载器，从views目录读取模板
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

//变量env就表示Nunjucks模板引擎对象,它有render(view, model)方法，
//正好传入view和model两个参数，并返回字符串
var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html', {
    name: '小明', fruits: [
        'apple', 'pench', 'peal', 'orange'
    ]
});
console.log(s);

//避免输出恶意脚本
s = env.render('hello.html', { name: '<script>alert("小明")</script>' });
console.log(s);

console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla..'
}));

/**
 * 性能
 */
/**
 * 最后我们要考虑一下Nunjucks的性能。
 * 对于模板渲染本身，速度是非常非常快的，因为就是拼字符串嘛，纯CPU操作。
 * 
 * 
 * 好消息是Nunjucks会缓存已读取的文本内容，也就是说，模板文件最多读取一次，
 * 就会放在内存中，后面的请求是不会再次读取文件的，只要我们指定noCache: false这个参数。
 */
