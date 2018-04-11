const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
const fs = require('fs');
const mkdirp = require('mkdirp');

class UploaderController extends Controller {
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);

    let now = new Date();
    let today = path.join(now.getFullYear().toString(), (now.getMonth() + 1).toString(), now.getDay().toString());
    let folder = path.join(this.app.config.upload.localFilePrex, today);
    let filename = now.getTime() + '__' + name;

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

    let url = path.join(this.app.config.upload.remoteFilePrex, today) + filename;

    ctx.body = {
      "status": "success",
      "url":  url
    };
    
  }
}

module.exports = UploaderController;