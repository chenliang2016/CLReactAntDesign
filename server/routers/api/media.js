
var Router = require('koa-router');
var router = new Router();

var parse = require('co-busboy');
var os = require('os');
var path = require('path');
var fs = require('fs');

var apiConstant = require('../../model/apiConstant')

router.post('/media/upload', function* (next){
 
  // multipart upload
  var parts = parse(this);
  var part;
  var returnpath = "";

  while (part = yield parts) {
    // var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
	  var stream = fs.createWriteStream(apiConstant.uploadFilePrex+part.filename);
    returnpath = apiConstant.uploadReturnFilePrex+part.filename;
    part.pipe(stream);
  }

  yield this.body = {
       status:"success",
  	   url:returnpath
  };
});

router.post('/media/uploadFiles', function* (next){
 
  // multipart upload
  var parts = parse(this);
  var part;
  var returnpath = "";

  while (part = yield parts) {
    // var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    var stream = fs.createWriteStream(apiConstant.uploadFilePrex+part.filename);
    if (returnpath=="") {
        returnpath+=apiConstant.uploadReturnFilePrex+part.filename;
    }else{
        returnpath += ";"+apiConstant.uploadReturnFilePrex+part.filename;
    }
    part.pipe(stream);
  }

  yield this.body = {
       status:"success",
       url:returnpath
  };
});


module.exports = router;
