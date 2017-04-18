var p = require('../../database/mysqlUtil');

var menuService = {};

menuService.getMenusPage = function * (pmenuId,page,size){
	var sqlString = `select * from fmenu where  1=1 `;
	if (pmenuId != undefined && pmenuId != '') {
		sqlString += ` and pmenuId = ${pmenuId} `;
	};

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString += '  order by orderNum ';

    sqlString  += ' limit ' +start +','+size;

	var rows = yield p.query(sqlString);
	return rows;
}

menuService.getMenusCount = function * (pmenuId){
	var sqlString = `select count(1) as cnt from fmenu where  1=1 `;
	if (pmenuId != undefined && pmenuId != '') {
		sqlString += ` and pmenuId = ${pmenuId} `;
	};

	var count = yield p.query(sqlString);
	return count[0].cnt;
}

menuService.getMenuByPid = function * (pmenuId){
	var sqlString = `select * from fmenu where  1=1 `;
	if (pmenuId != undefined && pmenuId != '') {
		sqlString += ` and pmenuId=${pmenuId} `;
	};
	var rows = yield p.query(sqlString);
	return rows;
}

menuService.getAllMenu = function * (){
	var sqlString = `select * from fmenu where  1=1 order by orderNum`;
	var rows = yield p.query(sqlString);
	return rows;
}

menuService.delete = function * (menuId){
	yield p.query(`delete from fmenu where  menuId = ${menuId} `);
}

menuService.addNew = function * (data){
	var sqlString = `insert into fmenu (name,menuKey,tourl,orderNum,pmenuId) 
		value("${data.name}","${data.menuKey}","${data.tourl}",${data.orderNum},${data.pmenuId})`;
	yield p.query(sqlString);
}

menuService.update = function * (data){
	yield p.query(`update fmenu set name = "${data.name}",
		menuKey = "${data.menuKey}", orderNum = ${data.orderNum} , pmenuId = ${data.pmenuId} , tourl = "${data.tourl}" where menuId = ${data.menuId}`);
}

module.exports = menuService;