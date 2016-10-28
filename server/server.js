// require("babel-core/register");
// require("babel-polyfill");
// set babel in entry file
require('babel-register')({
  plugins: ['transform-async-to-generator']
});
const convert = require('koa-convert')
const port = process.env.PORT || '8080'
const Koa = require('koa');
const app = new Koa();

const _use = app.use
app.use = x => _use.call(app, convert(x))

var router = require("./routers");

const json = require('koa-json');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const staticDir = require('koa-static');


app.use(json({pretty: false, param: 'pretty'}));
app.use(views('server/views', {
    map: {
        html: 'swig'
    }
}));

app.use(staticDir(__dirname + '/../dist'));
app.use(staticDir(__dirname + '/public'));

app.use(bodyParser());

router(app);

app.listen(port);
console.log('Server running');
