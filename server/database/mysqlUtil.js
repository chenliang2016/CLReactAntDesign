var wrapper = require('co-mysql'),
mysql = require('mysql');

var options = {
    host: '115.29.232.189',
    user: 'admin',
    password: '11111',
    port: '3306',
    database: 'clantd',
};

var pool = mysql.createPool(options),
p = wrapper(pool);

module.exports = p;
