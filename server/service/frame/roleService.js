var p = require('../../database/mysqlUtil');

var roleService = {};

roleService.getRolesPage = async (proleId,page,size) => {
	var sqlString = `select * from frole where  1=1 `;
	if (proleId != undefined && proleId != '') {
		sqlString += ` and proleId = ${proleId} `;
	};

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString  += ' limit ' +start +','+size;

	var rows = await p.query(sqlString);
	return rows;
}

roleService.getAllRoles = async () => {
	var sqlString = `select * from frole where  1=1 `;
	var rows = await p.query(sqlString);
	return rows;
}

roleService.getRolesCount = async (proleId) => {
	var sqlString = `select count(1) as cnt from frole where  1=1 `;
	if (proleId != undefined && proleId != '') {
		sqlString += ` and proleId = ${proleId} `;
	};

	var count = await p.query(sqlString);
	return count[0].cnt;
}

roleService.getRoleByPid = async (proleId) => {
	var sqlString = `select * from frole where  1=1 `;
	if (proleId != undefined && proleId != '') {
		sqlString += ` and proleId=${proleId} `;
	};
	var rows = await p.query(sqlString);
	return rows;
}

roleService.delete = async (roleId) => {
	await p.query(`delete from frole where  roleId = ${roleId} `);
}

roleService.addNew = async (data) => {
	var sqlString = `insert into frole (name,proleId) 
		value("${data.name}",${data.proleId})`;
	await p.query(sqlString);
}

roleService.update = async (data) => {
	await p.query(`update frole set name = "${data.name}",proleId = ${data.proleId} where roleId = ${data.roleId}`);
}

roleService.configRoleMenu = async (data) => {
	var menus = data.menus ;
  await p.query(`delete from froleMenu where  roleId = ${data.roleId} `);
  if (menus!=undefined && menus != ""){
    var menuArray = menus.split(",");
    for(var i = 0 ; i< menuArray.length ; i ++){
      var menuId = menuArray[i];
      if (parseInt(menuId) != -1 ) {
        var insertsql = `INSERT INTO froleMenu(menuId, roleId) SELECT ${menuId}, ${data.roleId} FROM DUAL WHERE NOT EXISTS(SELECT * FROM froleMenu WHERE menuId =${menuId} and roleId =${data.roleId} )`;
        await p.query(insertsql);
      }
    }
  }
}

roleService.getRoleMenus = async (roleId) => {
	var sqlString = `select menuId from froleMenu where  1=1 `;
	if (roleId != undefined && roleId != '') {
		sqlString += ` and roleId=${roleId} `;
	};
	var rows = await p.query(sqlString);
	return rows;
}

module.exports = roleService;
