const Service = require('../core/base_service');

class UserService extends Service {

    async checkUser(username,password){

    var loginsuccess = false;

    var user = await this.app.mysql.select('fuser', { // 搜索 post 表
        loginName: username, // 返回数据量
    });

    // var menus = [];
    // if (user!=undefined) {
    //     if(user.loginPasw == password){
    //         loginsuccess = true;
    //         if (username=='admin') {
    //             menus =  await menuService.getAllMenu(user.userId);
    //         }else{
    //             menus =  await userService.getUserMenus(user.userId);
    //         }
    //     } else {
    //         loginsuccess = false;
    //     }
    // } else {
    //     loginsuccess = false;
    // }

    // var token = jwt.sign(user, tokenConfig.JWT_SECRET,{expiresIn:tokenConfig.JWT_expiresIn});

    return user;
  }  

  async getUsersPage(page,size) {

    var page = parseInt(page);
    var size = parseInt(size);

    var start = (page-1)*size;
    var end = page*size;

    const users = await this.app.mysql.select('fuser', { // 搜索 post 表
        limit: size, // 返回数据量
        offset: start, // 数据偏移量
    });

    return users;
  }

  async getUserByUserName (username) {
      const row = await this.app.mysql.get('fuser',{loginName:username});
      return row;
  }

  async getUsersCount(){
    var sqlString = `select count(1) as cnt from fuser `;
    return await this.query(sqlString).cnt;
  }

  async configUserRole(data){
    var roles = data.roles ;
	await this.query(`delete from fuserrole where userId = ${data.userId} `);
    if (roles!=undefined && roles != ""){
        var roleArray = roles.split(",");
        for(var i = 0 ; i< roleArray.length ; i ++){
        var roleId = roleArray[i];
        if (parseInt(roleId) != -1 ) {
            var insertsql = `INSERT INTO fuserrole(userId, roleId) SELECT ${data.userId}, ${roleId} FROM DUAL WHERE NOT EXISTS(SELECT * FROM fuserrole WHERE userId =${data.userId} and roleId =${roleId} )`;
            await this.query(insertsql);
        }
        }
    }
  }

  async getUserRoles(userId) {

    let params = {};
    if (userId != undefined && userId != '') {
        params.userId = userId;
    }
 
    const rows = await this.app.mysql.select('fuserrole',{
        where:params,
        columns:['roleId']
    })

	return rows;
  }


  async getUserMenus(userId) {
    var sqlString = `select distinct m.* from fmenu m inner join frolemenu rm on m.menuId = rm.menuId where rm.roleId in 
	(select r.roleId from frole r inner join fuserrole ur on r.roleId = ur.roleId where ur.userId = ${userId}) order by m.orderNum `;
    
    console.log(sqlString);
    var rows = await this.query(sqlString);
	return rows;
  }

}

module.exports = UserService;
