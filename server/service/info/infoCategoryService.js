var p = require('../../database/mysqlUtil');

var infoCategoryService = {};

infoCategoryService.getInfoCategoryPage = async (pCategoryId,page,size) => {
    var sqlString = `select * from finfocategory where  1=1 `;
    if (pCategoryId != undefined && pCategoryId != '') {
        sqlString += ` and pCategoryId = ${pCategoryId} `;
    };

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString += '  order by orderNum ';

    sqlString  += ' limit ' +start +','+size;

    var rows = await p.query(sqlString);
    return rows;
}

infoCategoryService.getInfoCategorysCount = async (pCategoryId) => {
    var sqlString = `select count(1) as cnt from finfocategory where  1=1 `;
    if (pCategoryId != undefined && pCategoryId != '') {
        sqlString += ` and pCategoryId = ${pCategoryId} `;
    };

    var count = await p.query(sqlString);
    return count[0].cnt;
}

infoCategoryService.getInfoCategoryByPid = async (pCategoryId) => {
    var sqlString = `select * from finfocategory where  1=1 `;
    if (pCategoryId != undefined && pCategoryId != '') {
        sqlString += ` and pCategoryId=${pCategoryId} `;
    };
    var rows = await p.query(sqlString);
    return rows;
}

infoCategoryService.getAllCategory = async () => {
    var sqlString = `select * from finfocategory where  1=1 order by orderNum`;
    var rows = await p.query(sqlString);
    return rows;
}

infoCategoryService.delete = async (categoryId) => {
    await p.query(`delete from finfocategory where  categoryId = ${categoryId} `);
}

infoCategoryService.addNew = async (data) => {
    var sqlString = `insert into finfocategory (categoryName,orderNum,pCategoryId) 
		value("${data.categoryName}",${data.orderNum},${data.pCategoryId})`;
    await p.query(sqlString);
}

infoCategoryService.update = async (data) => {
    await p.query(`update finfocategory set categoryName = "${data.categoryName}",
		orderNum = ${data.orderNum}, pCategoryId = ${data.pCategoryId} where  categoryId = ${data.categoryId} `);
}

module.exports = infoCategoryService;