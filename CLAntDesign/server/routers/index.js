/**
 * the routers config file.
 * Created by chenliang on 16/04/28.
 */
/**
 * 页面跳转router
 * @param app
 */
const appRouter = (app) => {
    var router_app = require("./admin");
    app.use(router_app.routes()).use(router_app.allowedMethods());
};

const apiRouter = (app) => {

    //框架相关api
    var api_user = require("./api/frame/user");
    var api_menu = require("./api/frame/menu");//菜单
    var api_role = require("./api/frame/role");//角色管理
    var api_auth = require("./api/frame/auth");

    var api_media = require("./api/media");

    app.use(api_user.routes(),api_user.allowedMethods());
    app.use(api_menu.routes(),api_menu.allowedMethods());
    app.use(api_role.routes(),api_role.allowedMethods());
    app.use(api_auth.routes(),api_auth.allowedMethods());

    app.use(api_media.routes(),api_media.allowedMethods());

    //业务相关api
    require('./api/info')(app);
};

module.exports = (app) => {
    appRouter(app);
    apiRouter(app);
};
