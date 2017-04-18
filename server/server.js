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
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const _use = app.use
app.use = x => _use.call(app, convert(x))

var router = require("./routers");

const json = require('koa-json');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const staticDir = require('koa-static');
const body = require('koa-body');

const config = require('./config/config')

app.use(json({pretty: false, param: 'pretty'}));
app.use(views('server/views', {
    map: {
        html: 'swig'
    }
}));

app.use(staticDir(__dirname + '/../dist'));
app.use(staticDir(__dirname + '/public'));

app.use(body({
    multipart: true,
    formidable: {
        multiples: true,
        uploadDir: config.upload.localFilePrex,
        maxFieldsSize: 1024 * 10, // max file size: 10m
        onFileBegin: (name, file) => {
            let now = new Date();
            let today = path.join(now.getFullYear().toString(), (now.getMonth() + 1).toString(), now.getDay().toString());
            let folder = path.join(config.upload.localFilePrex, today);
            let filename = now.getTime() + '__' + file.name;

            try {
                fs.accessSync(folder, fs.constants.W_OK);
            } catch (err) {
                mkdirp.sync(folder);
            } finally {
                file.path = path.join(folder, filename);
            }
        }
    }
}));

app.use(bodyParser());

router(app);

app.listen(port);
console.log('Server running');
