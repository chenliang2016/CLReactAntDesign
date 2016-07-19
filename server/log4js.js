/**
 * Created by chenliang on 15/12/25.
 */

var log4js = require('log4js');
log4js.configure(__dirname+'/log4js.json', {reloadSecs: 300});

const httpLogger = log4js.getLogger('http');
const appLogger = log4js.getLogger('app');

var logger = {
    accessLogger: function(){
        return function * (next){
            var start = new Date;
            yield next;
            var ms = new Date - start;
            httpLogger.info('%s %s - %s', this.method, this.url, ms);
        }
    },
    debug: function(){
        appLogger.debug.apply(appLogger, arguments);
    },
    info: function(){
        appLogger.info.apply(appLogger, arguments);
    },
    error: function(){
        appLogger.error.apply(appLogger, arguments);
    }
};

module.exports = logger;

