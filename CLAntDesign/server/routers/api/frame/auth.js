/**
 * Created by chenliang on 16/1/4.
 */

const Router = require('koa-router');
const router = new Router({prefix: '/auth'});

var userService = require('../../../service/frame/userService');
var menuService = require('../../../service/frame/menuService');

router.post('/login', function *(next) {
    const username = this.request.body.username;
    const password = this.request.body.password;
    var loginsuccess = false;
    var user = yield userService.getUserByUserName(username);
    var menus = [];
    if (user!=undefined) {
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
}).get('/menus', function *() {
    var menus = yield db.Resource.findAll();
    yield this.body = menus;
}).get('/current_user', function *() {
    logger.debug('get current user: %s', JSON.stringify(this.session.user));
    yield this.body = this.session.user;
});

module.exports = router;
