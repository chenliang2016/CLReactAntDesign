/**
 * Created by chenliang on 16/1/4.
 */

const Router = require('koa-router');
const router = new Router();

var config = require('../../../config/config');
var tokenConfig = config.tokenConfig 

var jwt = require('jsonwebtoken');

var userService = require('../../../service/frame/userService');
var menuService = require('../../../service/frame/menuService');

router.post('/login', async (ctx) => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    var loginsuccess = false;
    var user = await userService.getUserByUserName(username);
    var menus = [];
    if (user!=undefined) {
        if(user.loginPasw == password){
            loginsuccess = true;
            if (username=='admin') {
                menus =  await menuService.getAllMenu(user.userId);
            }else{
                menus =  await userService.getUserMenus(user.userId);
            }
        } else {
            loginsuccess = false;
        }
    } else {
        loginsuccess = false;
    }

    var token = jwt.sign(user, tokenConfig.JWT_SECRET,{expiresIn:tokenConfig.JWT_expiresIn});

    ctx.body = {
        success : loginsuccess,
        data:{
            token:token,
            name:user.name
        },
        menus:menus,
    };
})



module.exports = router;
