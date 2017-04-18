/**
 * Created by chenliang on 2017/1/12.
 */
const path = require('path');
const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';

const defaults = {
    upload:{
        localFilePrex:'/Users/chenliang/website/upload/',//上传的图片位置
        downloadFilePrex:'http://localhost/upload/',
    },
    database:{
        host: 'rm-uf69e0aq27f1zj341o.mysql.rds.aliyuncs.com',
        user: 'zhendedev',
        password: 'Zhendedev123456',
        port: '3306',
        database: 'framework',
    },
    tokenConfig:{
        JWT_SECRET:"frameAntDesignToken",
        JWT_expiresIn:"30m"
    }
};

//正式环境参数不同的情况下修改对应参数
const specific = {
    test: {},
    production: {
        upload:{
            localFilePrex:'/Users/chenliang/website/upload/',//上传的图片位置
            downloadFilePrex:'http://localhost/upload/',
        },
        database:{
            host: 'rm-uf69e0aq27f1zj341o.mysql.rds.aliyuncs.com',
            user: 'zhendedev',
            password: 'Zhendedev123456',
            port: '3306',
            database: 'framework',
        },
        loggers: {
            console: {
                level: 'info'
            }
        }
    }
};

const finallyOpts = _.defaultsDeep(specific[env], defaults);

module.exports = finallyOpts;