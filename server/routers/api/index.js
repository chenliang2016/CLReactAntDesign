var config = require('../../config/config');
var tokenConfig = config.tokenConfig 
var jwt = require('koa-jwt');

const Router = require('koa-router');

const api_user = require("./frame/user");
const api_menu = require("./frame/menu");//菜单
const api_role = require("./frame/role");//角色管理
const api_auth = require("./frame/auth");

const api_media = require("./media");

const api_infoCategory = require('./info/infoCategory');
const api_info = require('./info/info');

const noAuthRouter = new Router();

const needAuthRouter = new Router();

module.exports = (app) => {
    noAuthRouter.use('/api/auth', api_auth.routes());
    noAuthRouter.use('/api/media', api_media.routes());

    needAuthRouter.use('/api/menu', api_menu.routes());
    needAuthRouter.use('/api/role', api_role.routes());
    needAuthRouter.use('/api/user', api_user.routes());
    
    needAuthRouter.use('/api/infoCategory', api_infoCategory.routes());
    needAuthRouter.use('/api/info', api_info.routes());

    app.use(noAuthRouter.routes());

    app.use(jwt({ secret: tokenConfig.JWT_SECRET }));

    app.use(needAuthRouter.routes());
};