const fs = require('fs');

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping：GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping：POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping：PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping：DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    //写法一:
    //先导入fs模块,然后用readdirSync列出文件
    //这里可以用sync是因为启动时只运行一次，不存在性能问题
    // var files = fs.readdirSync(__dirname + '/' + dir);
    // var js_files = files.filter((f) => {
    //     //过滤出.js文件    
    //     return f.endsWith('.js');
    // });

    // //处理每个js文件:
    // for (var f of js_files) {
    //     console.log(`process controller：${f}...`);
    //     let mapping = require(__dirname + '/' + dir + '/' + f);
    //     addMapping(router, mapping);
    // }
    //写法二:
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller：${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',//如果不传参数，扫面目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};