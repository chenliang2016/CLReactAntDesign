var Router = require('koa-router');
var router = new Router();

var parse = require('co-busboy');
var os = require('os');
var path = require('path');
var fs = require('fs');

var config = require('../../config/config')

router.post('/upload', async (ctx) => {
    let files = ctx.request.body.files;
    let returnpath = "";

    if (files) {
        Object.keys(files).forEach(key => {
            let file = files[key];
            let path = file.path;
            returnpath = config.upload.downloadFilePrex + path.replace(config.upload.localFilePrex, '').replace(/\\/g, '/');
        });
    }
    ctx.body = {
      "status": "success",
      "url": returnpath
    };
});

router.post('/simditorUploadImage', async (ctx) => {
    let files = ctx.request.body.files;
    let returnpath = "";

    if (files) {
        Object.keys(files).forEach(key => {
            let file = files[key];
            let path = file.path;
            returnpath = config.upload.downloadFilePrex + path.replace(config.upload.localFilePrex, '').replace(/\\/g, '/');
        });
    }

    ctx.body = {
      "success": true,
      "msg": "",
      "file_path": returnpath
    };
});

router.post('/uploadFiles', async (ctx) => {

    let files = ctx.request.body.files;
    let returnpath = "";

    if (files) {
        Object.keys(files).forEach(key => {
            let file = files[key];
            let path = file.path;

            let fileUrl = config.upload.downloadFilePrex + path.replace(config.upload.localFilePrex, '').replace(/\\/g, '/');

            if (returnpath == "") {
              returnpath += fileUrl;
            } else {
              returnpath += ";" + fileUrl;
            }
        });
    }

    ctx.body = {
      status: "success",
      url: returnpath
    };
});


module.exports = router;