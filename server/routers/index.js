/**
 * the routers config file.
 * Created by chenliang on 16/04/28.
 */
/**
 * 页面跳转router
 * @param app
 */
var apiConstant = require("../model/apiConstant");
var jwt = require('koa-jwt');

const appRouter = (app) => {
    var router_app = require("./admin");
    app.use(router_app.routes()).use(router_app.allowedMethods());
};

const mapiRouter = (app) => {
    var mapi_info = require("./mapi/info/minfo");
    app.use(mapi_info.routes(),mapi_info.allowedMethods())
};

const apiRouter = (app) => {

    //框架相关api
    var api_user = require("./api/frame/user");
    var api_menu = require("./api/frame/menu");//菜单
    var api_role = require("./api/frame/role");//角色管理
    var api_auth = require("./api/frame/auth");

    var api_media = require("./api/media");

    app.use(api_auth.routes(),api_auth.allowedMethods());
    app.use(api_media.routes(),api_media.allowedMethods());

    app.use(jwt({ secret: apiConstant.JWT_SECRET }));

    app.use(api_user.routes(),api_user.allowedMethods());
    app.use(api_menu.routes(),api_menu.allowedMethods());
    app.use(api_role.routes(),api_role.allowedMethods());


    //业务相关api
    require('./api/info')(app);
};

module.exports = (app) => {
    mapiRouter(app);
    appRouter(app);
    apiRouter(app);
};
