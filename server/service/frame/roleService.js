var p = require('../../database/mysqlUtil');

var roleService = {};

roleService.getRolesPage = function * (proleId,page,size){
	var sqlString = `select * from frole where  1=1 `;
	if (proleId != undefined && proleId != '') {
		sqlString += ` and proleId = ${proleId} `;
	};

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString  += ' limit ' +start +','+size;

	var rows = yield p.query(sqlString);
	return rows;
}

roleService.getAllRoles = function * (){
	var sqlString = `select * from frole where  1=1 `;
	var rows = yield p.query(sqlString);
	return rows;
}

roleService.getRolesCount = function * (proleId){
	var sqlString = `select count(1) as cnt from frole where  1=1 `;
	if (proleId != undefined && proleId != '') {
		sqlString += ` and proleId = ${proleId} `;
	};

	var count = yield p.query(sqlString);
	return count[0].cnt;
}

roleService.getRoleByPid = function * (proleId){
	var sqlString = `select * from frole where  1=1 `;
	if (proleId != undefined && proleId != '') {
		sqlString += ` and proleId=${proleId} `;
	};
	var rows = yield p.query(sqlString);
	return rows;
}

roleService.delete = function * (roleId){
	yield p.query(`delete from frole where  roleId = ${roleId} `);
}

roleService.addNew = function * (data){
	var sqlString = `insert into frole (name,proleId) 
		value("${data.name}",${data.proleId})`;
	yield p.query(sqlString);
}

roleService.update = function * (data){
	yield p.query(`update frole set name = "${data.name}",proleId = ${data.proleId} where roleId = ${data.roleId}`);
}

roleService.configRoleMenu = function * (data){
	var menus = data.menus ;
	var menuArray = menus.split(",");
	yield p.query(`delete from froleMenu where  roleId = ${data.roleId} `);
	for(var i = 0 ; i< menuArray.length ; i ++){
		var menuId = menuArray[i];
		if (parseInt(menuId) != -1 ) {
			var insertsql = `INSERT INTO froleMenu(menuId, roleId) SELECT ${menuId}, ${data.roleId} FROM DUAL WHERE NOT EXISTS(SELECT * FROM froleMenu WHERE menuId =${menuId} and roleId =${data.roleId} )`;
			yield p.query(insertsql);
		}
	}
}

roleService.getRoleMenus = function * (roleId){
	var sqlString = `select menuId from froleMenu where  1=1 `;
	if (roleId != undefined && roleId != '') {
		sqlString += ` and roleId=${roleId} `;
	};
	var rows = yield p.query(sqlString);
	return rows;
}

module.exports = roleService;