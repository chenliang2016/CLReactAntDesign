

module.exports = app => {
    app.router.post('/api/qiniu', app.controller.qiniu.qiniuUploadStream);
};