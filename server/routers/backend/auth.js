/**
 * Created by chenliang on 16/1/4.
 */

const Router = require('koa-router');
const router = new Router();
var p = require('../../database/mysqlUtil');

var userService = require('../../service/frame/userService');
var menuService = require('../../service/frame/menuService');

router.get('/login', function* (next) {
    yield this.render('login.html');
}).post('/login', function *(next) {
    const username = this.request.body.username;
    const password = this.request.body.password;
    var loginsuccess = false;
    var rows = yield p.query('select * from fuser where loginName ="'+username+'"');
    var user = {};
    var menus = [];
    if (rows.length>0) {
        user = rows[0];
        if(user.loginPasw == password){
            loginsuccess = true;
            if (username=='admin') {
                menus =  yield menuService.getAllMenu(user.userId);
            }else{
                menus =  yield userService.getUserMenus(user.userId);
            }
        } else {
            loginsuccess = false;
        }
    } else {
        loginsuccess = false;
    }

    yield this.body = {
        success : loginsuccess,
        data:user,
        menus:menus,
    };
}).get('/logout', function *() {
    this.session = null;
    this.redirect('/admin/login');
}).get('/menus', function *() {
    var menus = yield db.Resource.findAll();
    yield this.body = menus;
}).get('/current_user', function *() {
    logger.debug('get current user: %s', JSON.stringify(this.session.user));
    yield this.body = this.session.user;
});

module.exports = router;
