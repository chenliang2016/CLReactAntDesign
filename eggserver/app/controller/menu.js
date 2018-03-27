'use strict';

const Controller = require('../core/base_controller');

class MenuController extends Controller {
  async list() {
    const {ctx,app} = this;
    var q = ctx.query;
    var rows = await ctx.service.menu.getMenusPage(q.pmenuId,q.page,q.size);
    var count = await ctx.service.menu.getMenusCount(q.pmenuId);

    this.success({"rows":rows,
    "count":count})                   
  }

  async listByPid() {
    const {ctx,app} = this;
    var q = ctx.query;
    var rows = await ctx.service.menu.getMenuByPid(q.pid);
    this.success(rows);
  }

  async allList() {
    const {ctx,app} = this;
    var q = ctx.query;
    var rows = await ctx.service.menu.getAllMenu();
    this.success(rows);
  }

  async add() {
    const {ctx,app} = this;
    var menu = ctx.request.body;
    var success = await ctx.service.menu.add('fmenu',menu);
    this.success({ success : true,});
  }

  async delete() {
    const {ctx,app} = this;
    var q = ctx.query;
    var id = q.id;
    var success = await ctx.service.menu.delete('fmenu',{menuId:id});
    this.success({ success : true,});
  }

  async update() {
    const {ctx,app} = this;
    var menu = ctx.request.body;
    var success = await ctx.service.menu.update('fmenu',menu,{menuId:menu.menuId});
    this.success({ success : true,});
  }
  
}

module.exports = MenuController;