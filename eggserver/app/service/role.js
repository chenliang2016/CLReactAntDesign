const Service = require('../core/base_service');

class RoleService extends Service {

    async getRolesPage(proleId,page,size){

        let params = {};

        if (proleId != undefined && proleId != '') {
            params.proleId = proleId;
        };
       
        var pageInt = parseInt(page);
        var sizeInt = parseInt(size);
    
        var start = (page-1)*size;
    
        var rows = await this.app.mysql.select('frole', { 
            where: params,
            limit: size, 
            offset: start, 
        });

	    return rows;
    }

    async getAllRoles() {
        var rows = await this.app.mysql.select('frole');
        return rows;
    }
    
    async getRolesCount(proleId) {
        let sqlString = `select count(1) as cnt from frole where  1=1 `;
        if (proleId != undefined && proleId != '') {
            sqlString += ` and proleId = ${proleId} `;
        };

        let rows =  await this.app.mysql.query(sqlString);

        let count = 0 ;
        if (rows.length > 0){
            count = rows[0].cnt;
        }

        return count;
    }
    
    async getRoleByPid (proleId) {
        let params = {};
        if (proleId != undefined && proleId != '') {
            params.proleId = proleId;
        }

        let rows = await this.app.mysql.select('frole',
        {where:params});
        return rows;
    }
  

    async configRoleMenu(data){
        var menus = data.menus ;
        await this.query(`delete from froleMenu where  roleId = ${data.roleId} `);
        if (menus!=undefined && menus != ""){
          var menuArray = menus.split(",");
          for(var i = 0 ; i< menuArray.length ; i ++){
            var menuId = menuArray[i];
            if (parseInt(menuId) != -1 ) {
              var insertsql = `INSERT INTO froleMenu(menuId, roleId) SELECT ${menuId}, ${data.roleId} FROM DUAL WHERE NOT EXISTS(SELECT * FROM froleMenu WHERE menuId =${menuId} and roleId =${data.roleId} )`;
              await this.query(insertsql);
            }
          }
        }
    }
    
    async getRoleMenus (roleId) {
        let params = {};
        if (roleId != undefined && roleId != '') {
            params.roleId = roleId;
        };

        const rows = await this.app.mysql.select('froleMenu',{
            where:params,
            columns: ['menuId'],
        })
        return rows;
    }

}

module.exports = RoleService;