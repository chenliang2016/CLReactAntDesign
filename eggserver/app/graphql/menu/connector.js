'use strict';
class MenuConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async getMenuList(pmenuId,page,size) {
        return await this.ctx.service.menu.getMenusPage(pmenuId,page,size);
    }

    async getMenuCount(pmenuId) {
        let count = await this.ctx.service.menu.getMenusCount(pmenuId);
        return count;
    }

    async getAllMenu() {
        return await this.ctx.service.menu.getAllMenu();
    }

}

module.exports = MenuConnector;