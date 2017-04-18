/**
 * Created by chenliang on 16/1/4.
 */

const Router = require('koa-router');
const router = new Router({prefix: '/api/auth'});

var config = require('../../../config/config');
var tokenConfig = config.tokenConfig 

var jwt = require('koa-jwt');

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

    var token = jwt.sign(user, tokenConfig.JWT_SECRET,{expiresIn:tokenConfig.JWT_expiresIn});

    yield this.body = {
        success : loginsuccess,
        data:{
            token:token,
            name:user.name
        },
        menus:menus,
    };
})

module.exports = router;
