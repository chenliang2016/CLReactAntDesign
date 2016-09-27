module.exports = (app) => {
    const api_infoCategory = require('./infoCategory');
    app.use(api_infoCategory.routes(),api_infoCategory.allowedMethods());

    const api_info = require('./info');
    app.use(api_info.routes(),api_info.allowedMethods());
};