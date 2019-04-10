/**
 * 
 * 注意到我们其实不需要创建表的SQL,因为Sequelize提供了一个sync方法，
 * 可以自动创建数据库。这个功能在开发和生产环境中没有什么用，但是在测试环境非常有用。
 * 开发环境下，首次使用sync()也可以自动创建出表结构，避免了手动运行SQL的问题
 * 这样，可以随时修改Model的定义，并立刻运行测试。
 * 测试时，可以用sync方法自动创建出表结构，而不是自己维护SQL脚本。
 *  
 */
const model = require('./model');
model.sync();

console.log('init db ok.');
process.exit(0);