console.log(process.env.NODE_ENV);

const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}

console.log(generateId().replace('-',''));