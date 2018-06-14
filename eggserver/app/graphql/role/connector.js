'use strict';
class RoleConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async getRoleList(proleId,page,size) {
        return await this.ctx.service.role.getRolesPage(proleId,page,size);
    }

    async getRoleCount(proleId) {
        let count = await this.ctx.service.role.getRolesCount(proleId);
        return count;
    }

    async getAllRoles() {
        return await this.ctx.service.role.getAllRoles();
    }

    async getRoleMenus(roleId) {
        return await this.ctx.service.role.getRoleMenus(roleId);
    }

}

module.exports = RoleConnector;