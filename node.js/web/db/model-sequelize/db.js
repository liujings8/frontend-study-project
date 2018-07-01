/**
 * db.js的作用就是统一Model的定义
 *
 */

const Sequelize = require('sequelize');
const config = require('./config');
const uuid = require('node-uuid');

console.log('init sequelize...');

function generateId() {
    uuid.v4();
}
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE
        // ,
        // primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    console.log('will create entity ...' + obj);
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createAt = now;
                    obj.updateAt = now;
                    obj.version = 0;
                } else {
                    console.log('will update entity...');
                    obj.updateAt = now;
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: () => {
        
        //only allow create dll in non-production enviroment:
        if (process.env.NODE_ENV !== 'production') {
            console.log('init dll sql');
            // sequelize.sync()会同步sequelize实例中定义所有模型。
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};


for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;


/**
 * 首先要定义的就是Model存放的文件夹必须在models内，
 * 并且以Model名字命名，例如：Pet.js,User.js等等
 * 
 * 其次，每个model必须遵守一套规范：
 * 1. 统一主键，名称必须是id，类型必须是STRING(50);
 * 2. 主键可以自己指定，也可以由框架自动生成(如果为null或undefined);
 * 3. 所有字段默认为NOT NULL,除非显示指定;
 * 4. 统一timestamp机制，每个Model必须有createAt、updateAt和version，分别记录创建时间、修改时间和版本号。其中，
 *  createAt和updateAt以BIGINT存储时间戳，最大的好处是无需处理时区，排序方便。version每次修改时自增。
 */

//我们定义的defineModel就是为了强制实现上述规则

/**
 * Sequelize在创建、修改Entity时会调用我们指定的函数。这些函数通过hooks在定义Model时指定。
 * 我们在beofreValidate这个事件中根据是否是isNewRecord设置主键(如果主键为null或undefined)、
 * 设置时间戳和版本号
 * 
 * 这样一来，Model定义的时候就可以大大简化。
 */