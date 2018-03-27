
'use strict';

const Controller = require('../core/base_controller');

class RoleController extends Controller {
  async list() {
    const {ctx,app} = this;
    var q = ctx.query;
    var rows = await ctx.service.role.getRolesPage(q.proleId,q.page,q.size);
    var count = await ctx.service.role.getRolesCount(q.proleId);

    this.success({"rows":rows,
    "count":count})                   
  }

  async listByPid() {
    const {ctx,app} = this;
    var q = ctx.query;
    var rows = await ctx.service.role.getRoleByPid(q.pid);
    this.success(rows);
  }

  async allList() {
    const {ctx,app} = this;
    var q = ctx.query;
    var rows = await ctx.service.role.getAllRoles();

    this.success(rows);
  }

  async add() {
    const {ctx,app} = this;
    var role = ctx.request.body;
    var success = await ctx.service.role.add('frole',role);

    ctx.body = {
        success : true,
    };

    this.success({ success : true,});
  }

  async delete() {
    const {ctx,app} = this;
    var q = ctx.query;
    var id = q.id;
    var success = await ctx.service.role.delete('frole',{roleId:id});
    this.success({ success : true,});
  }

  async update() {
    const {ctx,app} = this;
    var role = ctx.request.body;
    var success = await ctx.service.role.update('frole',role,{roleId:role.roleId});
    this.success({ success : true,});
  }

  async configRoleMenu() {
    const {ctx,app} = this;
    var roleMenuFormData = ctx.request.body;
    await ctx.service.role.configRoleMenu(roleMenuFormData);
    ctx.body = {
        success : true,
    };
  }

  async getRoleMenus() {
    const {ctx,app} = this;
    var q = ctx.query;
    var rows =  await ctx.service.role.getRoleMenus(q.roleId);
    this.success(rows)
  }
  
}

module.exports = RoleController;



