const Sequelize = require('sequelize');

const config = require('./config');

console.log('init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//定义模型Pet，告诉Sequelize如何映射数据库表
//用sequelize定义Model时，传入名称pet，默认的表名就是pets
//第三个参数时额外的配置，我们传入{ timestamp: false}是为了关闭Sequelize的自动添加timestamp的功能
//我们把通过sequelize.define()返回的Pet成为数据模型，它表示一个数据模型
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
    },{
        timestamps: false
});

var now = Date.now();

// create 的Promise方式
// Pet.create({
//     id: 'g-' + now,
//     name: 'Gaffey',
//     gender: false,
//     birth: '2007-07-07',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function (p) {
//     console.log('created.' + JSON.stringify(p));
// }).catch(function (err) {
//     console.log('failed:' + err);
// });

//create 的await方式
// (async () =>{
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: 'Odie',
//         gender: false,
//         birth: '2008-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
// })();

/*
我们把通过Pet.findAll()返回的一个或一组对象称为Model实例，每个实例都可以直接通过JSON.stringfy序列化成JSON字符串。
但是它们和普通的JSON对象相比，多了一些由Sequelize添加的方法，比如save()或destory()。
调用这些方法我们可以执行更新或者删除操作。
*/
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++;
        //修改
        await p.save();
        if (p.version === 3) {
            //删除
            await p.destroy();
            console.log(`${p.name} was destoryed.`);
        }
    }
})();

/*
考虑到koa的处理函数都是async函数，所以我们实际上将来在koa的async函数中直接写await访问数据库就可以！
这就是为什么我们选择Sequelize的原因：只要API返回Promise，就可以用await抵用，写代码非常简单！
*/