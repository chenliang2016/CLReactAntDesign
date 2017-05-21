// require("babel-core/register");
// require("babel-polyfill");
// set babel in entry file

'use strict';

const http = require('http');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const staticDir = require('koa-static');
const body = require('koa-body');
const convert = require('koa-convert')
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const port = process.env.PORT || '8080'
const Koa = require('koa');
const app = new Koa();

const server = http.createServer(app.callback());

var router = require("./routers");

const config = require('./config/config')

app.use(json({pretty: false, param: 'pretty'}));

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

server.listen(port, () => {
    console.log(`app started in ${port}`);
});
