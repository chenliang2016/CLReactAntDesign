'use strict';
class UserConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async getUserList(page,size) {
        return await this.ctx.service.user.getUsersPage(page,size);
    }

    async getUserCount() {
        let count = await this.ctx.service.user.getUsersCount();
        return count;
    }

}

module.exports = UserConnector;