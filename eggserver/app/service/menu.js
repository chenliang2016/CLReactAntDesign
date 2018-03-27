const Service = require('../core/base_service');

class MenuService extends Service {
    async getMenusPage(pmenuId,page,size){

        let params = {};

        if (pmenuId != undefined && pmenuId != '') {
            params.pmenuId = pmenuId;
        };
    
        var rows = await this.app.mysql.select('fmenu', { 
            where: params,
            orders: [['orderNum','desc']], 
            limit: size, 
            offset: page, 
        });

	    return rows;
    }

    async getMenusCount(pmenuId) {

        let sqlString = `select count(1) as cnt from fmenu where  1=1 `;
        if (pmenuId != undefined && pmenuId != '') {
            sqlString += ` and pmenuId = ${pmenuId} `;
        };

        let row =  await this.app.mysql.query(sqlString);
        return row.cnt;
    }

    async getMenuByPid(pmenuId){
        var sqlString = `select * from fmenu where  1=1 `;
        if (pmenuId != undefined && pmenuId != '') {
            sqlString += ` and pmenuId=${pmenuId} `;
        };
        let rows =  await this.app.mysql.query(sqlString);
        return rows;
    }

    async getAllMenu(){
        var rows = await this.app.mysql.select('fmenu', { 
            orders: [['orderNum','desc']], 
        });
        return rows;
    }

}

module.exports = MenuService;