/**
 * the routers config file.
 *
 * Created by chenliang on 15/12/25.
 */

const Router = require('koa-router');

/**
 * the router of admin.
 * @param app
 */
function backend(app) {
    var admin = new Router({prefix: '/admin'});

    var adminlogin = new Router({prefix:'/admin'});

    var admin_index = require("./backend");
    var auth = require("./backend/auth");

    adminlogin.use(auth.routes(),auth.allowedMethods());
    app.use(adminlogin.routes(),adminlogin.allowedMethods());

   admin.use(admin_index.routes(), admin_index.allowedMethods());
   app.use(admin.routes());
   app.use(admin.allowedMethods());

}

function api(app) {
	var api = new Router({prefix: '/api'});

    //框架相关api
    var api_user = require("./api/frame/user");
    var api_menu = require("./api/frame/menu");//菜单
    var api_role = require("./api/frame/role");//角色管理

    var api_media = require("./api/media.js");

    api.use(api_user.routes(),api_user.allowedMethods());
    api.use(api_menu.routes(),api_menu.allowedMethods());
    api.use(api_role.routes(),api_role.allowedMethods());

    api.use(api_media.routes(),api_media.allowedMethods());

    //业务相关api
    

    app.use(api.routes());
    app.use(api.allowedMethods());
}

module.exports = function (app) {
    backend(app);
    api(app);
};
