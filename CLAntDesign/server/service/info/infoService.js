var p = require('../../database/mysqlUtil');

var infoService = {};

infoService.getInfoPage = function * (categoryId,page,size){
    var sqlString = `select infoId,createDate,updateDate,categoryName,topic,url,city,categoryId from finfo where  1=1 `;
    if (categoryId != undefined && categoryId != '') {
        sqlString += ` and categoryId = ${categoryId} `;
    };

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString += '  order by createDate desc';

    sqlString  += ' limit ' +start +','+size;

    var rows = yield p.query(sqlString);
    return rows;
}

infoService.getInfoCount = function * (categoryId){
    var sqlString = `select count(1) as cnt from finfo where  1=1 `;
    if (categoryId != undefined && categoryId != '') {
        sqlString += ` and categoryId = ${categoryId} `;
    };

    var count = yield p.query(sqlString);
    return count[0].cnt;
}

infoService.getInfoByCid = function * (categoryId){
    var sqlString = `select * from finfo where  1=1 `;
    if (categoryId != undefined && categoryId != '') {
        sqlString += ` and categoryId=${categoryId} `;
    };
    var rows = yield p.query(sqlString);
    return rows;
}

infoService.getInfoById = function * (infoId){
    var sqlString = `select * from finfo where  1=1 `;
    if (infoId != undefined && infoId != '') {
        sqlString += ` and infoId=${infoId} `;
    };
    var rows = yield p.query(sqlString);
    if (rows.length>0){
        return rows[0];
    }
    return undefined;
}

infoService.delete = function * (infoId){
    yield p.query(`delete from finfo where  infoId = ${infoId} `);
}

infoService.addNew = function * (data){
    var sqlString = `insert into finfo (createDate,updateDate,categoryName,topic,content,url,headImage,infoDes,city,categoryId) 
		value(now(),now(),'${data.categoryName}','${data.topic}','${data.content}','${data.url}','${data.headImage}','${data.infoDes}','${data.city}',${data.categoryId})`;
    yield p.query(sqlString);
}

infoService.update = function * (data){
    yield p.query(`update finfo set categoryName = "${data.categoryName}",
		topic = '${data.topic}', content = '${data.content}', url = '${data.url}', headImage = '${data.headImage}'
        , infoDes = '${data.infoDes}', city = '${data.city}', categoryId = ${data.categoryId} where infoId=${data.infoId}` );
}

module.exports = infoService;