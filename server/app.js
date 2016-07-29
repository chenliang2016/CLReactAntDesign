/**
 * Created by chenliang on 15/12/24.
 */

const port = process.env.PORT || '3001';
const koa = require('koa');
const convert = require('koa-convert')
const json = require('koa-json');
const views = require('koa-views');
const gzip = require('koa-gzip');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const favicon = require('koa-favicon');
const static = require('koa-static');

const session = require('koa-generic-session');
const bodyParser = require('koa-bodyparser');

const routers = require('./routers');
const logger = require('./log4js');

const app = new koa();

const _use = app.use
app.use = x => _use.call(app, convert(x))

global.logger = logger;

app.use(logger.accessLogger());
app.use(json({pretty: false, param: 'pretty'}));
app.use(views('views', {
    map: {jade: 'jade', html: 'swig'},
    default: 'jade'
}));

app.use(gzip());
app.use(conditional());
app.use(etag());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(static(__dirname + '/public'));
app.use(static(__dirname + '/../dist'));

app.keys = ['your secret key'];
app.use(session());
app.use(bodyParser());

routers(app);

app.on('error', function (err, ctx) {
    logger.error('server error', err, ctx);
});

app.listen(port);

logger.info('app start on port ', port);
