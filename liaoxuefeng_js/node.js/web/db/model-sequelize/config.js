const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';
const fs = require('fs');
var config = null;
if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}`);
            /**
             * Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
             * 语法: Object.assign(target, ...sources)
             */
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
};

module.exports = config;

/**
 * 具体的规则是：
 * 1. 先读取config-default.js;
 * 2. 如果不是测试环境，就读取config-override.js，如果文件不存在，就忽略。
 * 3. 如果是测试环境，就读取config-test.js。
 * 
 */