var p = require('../../database/mysqlUtil');

var menuService = {};

menuService.getMenusPage = async (pmenuId,page,size) => {
	var sqlString = `select * from fmenu where  1=1 `;
	if (pmenuId != undefined && pmenuId != '') {
		sqlString += ` and pmenuId = ${pmenuId} `;
	};

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString += '  order by orderNum ';

    sqlString  += ' limit ' +start +','+size;

	var rows = await p.query(sqlString);
	return rows;
}

menuService.getMenusCount = async (pmenuId) => {
	var sqlString = `select count(1) as cnt from fmenu where  1=1 `;
	if (pmenuId != undefined && pmenuId != '') {
		sqlString += ` and pmenuId = ${pmenuId} `;
	};

	var count = await p.query(sqlString);
	return count[0].cnt;
}

menuService.getMenuByPid = async (pmenuId) => {
	var sqlString = `select * from fmenu where  1=1 `;
	if (pmenuId != undefined && pmenuId != '') {
		sqlString += ` and pmenuId=${pmenuId} `;
	};
	var rows = await p.query(sqlString);
	return rows;
}

menuService.getAllMenu = async () => {
	var sqlString = `select * from fmenu where  1=1 order by orderNum`;
	var rows = await p.query(sqlString);
	return rows;
}

menuService.delete = async (menuId) => {
	await p.query(`delete from fmenu where  menuId = ${menuId} `);
}

menuService.addNew = async (data) => {
	var sqlString = `insert into fmenu (name,menuKey,tourl,orderNum,pmenuId,tag) 
		value("${data.name}","${data.menuKey}","${data.tourl}",${data.orderNum},${data.pmenuId},"${data.tag}")`;
	await p.query(sqlString);
}

menuService.update = async (data) => {
	await p.query(`update fmenu set name = "${data.name}",
		menuKey = "${data.menuKey}", orderNum = ${data.orderNum} , 
		pmenuId = ${data.pmenuId} , 
		tourl = "${data.tourl}",
		tag = "${data.tag}" where menuId = ${data.menuId}`);
}

module.exports = menuService;