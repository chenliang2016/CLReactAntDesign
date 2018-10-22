
'use strict';

const Controller = require('../core/base_controller');
const qiniu = require('qiniu')
const path = require('path')
const fs = require('fs');
const mkdirp = require('mkdirp');
const moment = require('moment');

class QiniuController extends Controller {

  async qiniuUpload () {

    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);

    let now = new Date();
    let today = path.join(now.getFullYear().toString(), (now.getMonth() + 1).toString(), now.getDay().toString(),"/");
    let folder = path.join(this.app.config.upload.localFilePrex, today);
    // let filename = now.getTime() + '__' + name;
    let filename = now.getTime() + '.jpg';

    try {
        fs.accessSync(folder, fs.constants.W_OK);
    } catch (err) {
        mkdirp.sync(folder);
    } finally {

    }

    const fileAbsoluteName = folder + filename;

    var fileWriteStream = fs.createWriteStream(fileAbsoluteName);  
    stream.pipe(fileWriteStream);  
    fileWriteStream.on('close',function(){  
        console.log('copy over');    
    });  

    let url = `${this.app.config.upload.qiniuCdn}` + filename;

    await this.qiniuUploadToServer(fileAbsoluteName,filename);
    
    console.log(url);

    ctx.body = {
      "status": "success",
      "url":  url
    };
  }

  async qiniuUploadStream () {

    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);

    let filename = moment().format("YYYYMMDDHHmmss")+ '.jpg';

    let success =  await this.qiniuUploadToServerWithStream(stream,filename);
    
    if (success){
        let url = `${this.app.config.upload.qiniuCdn}` + filename;
        ctx.body = {
          "status": "success",
          "url":  url
        };
    }else{
        ctx.body = {
          "status": "error",
          "url":  ""
        };
    }
   
  }

  async qiniuUploadToServerWithStream(stream,filename,bucket){

    const AK = "t1wbKb47Zlgmen1uLZj7GaGAGaMFhkbRoXCjrDeF";
    const SK = "L6Ky9R5v2tbfvQMsK3_JGDNWEi91M1TzlPzEqqfq";

    var mac = new qiniu.auth.digest.Mac(AK, SK);

    if (bucket == undefined){
        bucket = "ybimage"
    }

    var options = {
          scope: bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);

    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0;
    // 是否使用https域名
    //config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    config.useCdnDomain = true;

    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var readableStream = stream; // 可读的流
    
    return new Promise((resolve,reject) => {
        formUploader.putStream(uploadToken, filename, readableStream, putExtra, function(respErr,
            respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
                resolve(true);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
                reject(false);
            }
        });
    })

  }


  async qiniuUploadToServer(localFile,key,bucket){
      const AK = "t1wbKb47Zlgmen1uLZj7GaGAGaMFhkbRoXCjrDeF";
      const SK = "L6Ky9R5v2tbfvQMsK3_JGDNWEi91M1TzlPzEqqfq";

      var mac = new qiniu.auth.digest.Mac(AK, SK);

      if (bucket == undefined){
          bucket = "ybimage"
      }

      var options = {
          scope: bucket,
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);

      var config = new qiniu.conf.Config();
      // 空间对应的机房
      config.zone = qiniu.zone.Zone_z0;
      // 是否使用https域名
      //config.useHttpsDomain = true;
      // 上传是否使用cdn加速
      config.useCdnDomain = true;

      var formUploader = new qiniu.form_up.FormUploader(config);
      var putExtra = new qiniu.form_up.PutExtra();
      // 文件上传
      formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          console.log(respBody);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
  }

}

module.exports = QiniuController;
