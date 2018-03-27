'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {

    async login() {
        const {ctx,app} = this;
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        var loginsuccess = false;
        var user = await ctx.service.user.getUserByUserName(username);
        var menus = [];
        if (user!=undefined) {
            if(user.loginPasw == password){
                loginsuccess = true;
                if (username=='admin') {
                    menus =  await ctx.service.menu.getAllMenu(user.userId);
                }else{
                    menus =  await ctx.service.user.getUserMenus(user.userId);
                }
            } else {
                loginsuccess = false;
            }
        } else {
            loginsuccess = false;
        }

        let token = undefined;
        if (user != undefined){
            token = app.jwt.sign({userId:user.userId}, app.config.jwt.secret,{expiresIn:app.config.jwt.expiresIn});
        }

        if (loginsuccess){
            this.success({
                token:token,
                name:user.name,
                menus:menus
                });
        }else{
            this.error("登录密码错误");
        }
        
      
    }

    async list(){
        const ctx = this.ctx;
        var q = ctx.query;
        var rows = await ctx.service.user.getUsersPage(q.page,q.size);
        var count = await ctx.service.user.getUsersCount();

        this.success({"rows":rows,
        "count":count})
    }

    async add(){
        const ctx = this.ctx;
        var user = ctx.request.body;
        await ctx.service.user.add('fuser',user);
        this.success({})
    }

    async delete(){
        const ctx = this.ctx;
        var q = ctx.query;
        var userId = q.userId;

        await ctx.service.user.delete('fuser',{userId:userId})
        this.success({})
    }

    async update(){
        const ctx = this.ctx;
        var user = ctx.request.body;
        await ctx.service.user.update('fuser',user,{userId:user.userId});
        this.success({})
    }

    async configUserRole(){
        const ctx = this.ctx;
        var userRoleFormData = ctx.request.body;
        await ctx.service.user.configUserRole(userRoleFormData);
        this.success({})
    }

    async getUserRoles(){
        const ctx = this.ctx;
        var q = ctx.query;
        var rows =  await ctx.service.user.getUserRoles(q.userId);
        this.success(rows);
    }

    async getUserMenus(){
        const ctx = this.ctx;
        var q = ctx.query;
        var rows =  await ctx.service.user.getUserMenus(q.userId);
        this.success(rows);
    }

}

module.exports = UserController;