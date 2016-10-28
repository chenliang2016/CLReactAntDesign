var p = require('../../database/mysqlUtil');

var userService = {};

userService.getUsersPage = function * (page,size){
	var page = parseInt(page);
    var size = parseInt(size);

    var start = (page-1)*size;
    var end = page*size;

    var rows = yield p.query('select * from fuser limit ' +start +','+end);

	return rows;
}

userService.getUserByUserName = function * (username){
  var rows = yield p.query('select * from fuser where loginName ="'+username+'"');
  if (rows.length>0){
     return rows[0];
  }
  return undefined;
}

userService.delete = function * (userId){
	yield p.query(`delete from fuser where  userId = ${userId} `);
}

userService.addNew = function * (data){
	var sqlString = `insert into fuser (loginName,loginPasw,name) 
		value("${data.loginName}","${data.loginPasw}","${data.name}")`;
	yield p.query(sqlString);
}

userService.update = function * (data){
	yield p.query(`update fuser set loginName = "${data.loginName}",
		loginPasw = "${data.loginPasw}",
		name = "${data.name}" where userId = ${data.userId}`);
}

userService.getUsersCount = function * (){
	var sqlString = `select count(1) as cnt from fuser `;
	var count = yield p.query(sqlString);
	return count[0].cnt;
}

userService.configUserRole = function * (data){
	var roles = data.roles ;
	yield p.query(`delete from fuserrole where userId = ${data.userId} `);
  if (roles!=undefined && roles != ""){
    var roleArray = roles.split(",");
    for(var i = 0 ; i< roleArray.length ; i ++){
      var roleId = roleArray[i];
      if (parseInt(roleId) != -1 ) {
        var insertsql = `INSERT INTO fuserrole(userId, roleId) SELECT ${data.userId}, ${roleId} FROM DUAL WHERE NOT EXISTS(SELECT * FROM fuserrole WHERE userId =${data.userId} and roleId =${roleId} )`;
        yield p.query(insertsql);
      }
    }
  }
}

userService.getUserRoles = function * (userId){
	var sqlString = `select roleId from fuserrole where  1=1 `;
	if (userId != undefined && userId != '') {
		sqlString += ` and userId=${userId} `;
	};
	var rows = yield p.query(sqlString);
	return rows;
}

userService.getUserMenus = function * (userId){
	var sqlString = `select distinct m.* from fmenu m inner join frolemenu rm on m.menuId = rm.menuId where rm.roleId in 
	(select r.roleId from frole r inner join fuserrole ur on r.roleId = ur.roleId where ur.userId = ${userId}) order by m.orderNum `;
	var rows = yield p.query(sqlString);
	return rows;
}

module.exports = userService;
