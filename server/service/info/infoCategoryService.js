var p = require('../../database/mysqlUtil');

var infoCategoryService = {};

infoCategoryService.getInfoCategoryPage = function * (pCategoryId,page,size){
    var sqlString = `select * from finfocategory where  1=1 `;
    if (pCategoryId != undefined && pCategoryId != '') {
        sqlString += ` and pCategoryId = ${pCategoryId} `;
    };

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString += '  order by orderNum ';

    sqlString  += ' limit ' +start +','+size;

    var rows = yield p.query(sqlString);
    return rows;
}

infoCategoryService.getInfoCategorysCount = function * (pCategoryId){
    var sqlString = `select count(1) as cnt from finfocategory where  1=1 `;
    if (pCategoryId != undefined && pCategoryId != '') {
        sqlString += ` and pCategoryId = ${pCategoryId} `;
    };

    var count = yield p.query(sqlString);
    return count[0].cnt;
}

infoCategoryService.getInfoCategoryByPid = function * (pCategoryId){
    var sqlString = `select * from finfocategory where  1=1 `;
    if (pCategoryId != undefined && pCategoryId != '') {
        sqlString += ` and pCategoryId=${pCategoryId} `;
    };
    var rows = yield p.query(sqlString);
    return rows;
}

infoCategoryService.getAllCategory = function * (){
    var sqlString = `select * from finfocategory where  1=1 order by orderNum`;
    var rows = yield p.query(sqlString);
    return rows;
}

infoCategoryService.delete = function * (categoryId){
    yield p.query(`delete from finfocategory where  categoryId = ${categoryId} `);
}

infoCategoryService.addNew = function * (data){
    var sqlString = `insert into finfocategory (categoryName,orderNum,pCategoryId) 
		value("${data.categoryName}",${data.orderNum},${data.pCategoryId})`;
    yield p.query(sqlString);
}

infoCategoryService.update = function * (data){
    yield p.query(`update finfocategory set categoryName = "${data.categoryName}",
		orderNum = ${data.orderNum}, pCategoryId = ${data.pCategoryId} where  categoryId = ${data.categoryId} `);
}

module.exports = infoCategoryService;