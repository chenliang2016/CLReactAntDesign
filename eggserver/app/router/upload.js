module.exports = app => {
    app.router.post('/api/upload',app.controller.upload.upload);
};