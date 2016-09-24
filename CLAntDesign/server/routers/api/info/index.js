module.exports = (app) => {
    var api_infoCategory = require('./infoCategory');
    app.use(api_infoCategory.routes(),api_infoCategory.allowedMethods());
};