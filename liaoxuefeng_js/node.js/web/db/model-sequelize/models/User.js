const db = require('../db');

module.exports = db.defineModel('users',{
    id: db.ID,
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});