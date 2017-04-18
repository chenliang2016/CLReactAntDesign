var wrapper = require('co-mysql'),
mysql = require('mysql');

var config = require('../config/config');

var options = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.database,
};

var pool = mysql.createPool(options),
p = wrapper(pool);

module.exports = p;
