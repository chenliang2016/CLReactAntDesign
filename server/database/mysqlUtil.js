var wrapper = require('co-mysql'),
mysql = require('mysql');

var options = {
    host: 'localhost',
    user: 'root',
    password: '11111',
    port: '3306',
    database: 'clantd',
};

var pool = mysql.createPool(options),
p = wrapper(pool);

module.exports = p;
