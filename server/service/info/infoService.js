var p = require('../../database/mysqlUtil');

var infoService = {};

infoService.getInfoPage = async (categoryId,page,size) => {
    var sqlString = `select infoId,createDate,infoDes,categoryName,topic,url,city,categoryId from finfo where  1=1 `;
    if (categoryId != undefined && categoryId != '') {
        sqlString += ` and categoryId = ${categoryId} `;
    };

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString += '  order by createDate desc';

    sqlString  += ' limit ' +start +','+size;

    var rows = await p.query(sqlString);
    return rows;
}

infoService.getInfoPageByCategoryName = async (categoryName,page,size) => {
    var sqlString = `select infoId,createDate,updateDate,categoryName,topic,url,city,categoryId,headImage from finfo where  1=1 `;
    if (categoryName != undefined && categoryName != '') {
        sqlString += ` and categoryName = '${categoryName}' `;
    };

    var pageInt = parseInt(page);
    var sizeInt = parseInt(size);

    var start = (page-1)*size;

    sqlString += '  order by createDate desc';

    sqlString  += ' limit ' +start +','+size;

    var rows = await p.query(sqlString);
    return rows;
}

infoService.getInfoCount = async (categoryId) => {
    var sqlString = `select count(1) as cnt from finfo where  1=1 `;
    if (categoryId != undefined && categoryId != '') {
        sqlString += ` and categoryId = ${categoryId} `;
    };

    var count = await p.query(sqlString);
    return count[0].cnt;
}

infoService.getInfoByCid = async (categoryId) => {
    var sqlString = `select * from finfo where  1=1 `;
    if (categoryId != undefined && categoryId != '') {
        sqlString += ` and categoryId=${categoryId} `;
    };
    var rows = await p.query(sqlString);
    return rows;
}

infoService.getInfoById = async (infoId) => {
    var sqlString = `select * from finfo where  1=1 `;
    if (infoId != undefined && infoId != '') {
        sqlString += ` and infoId=${infoId} `;
    };
    var rows = await p.query(sqlString);
    if (rows.length>0){
        return rows[0];
    }
    return undefined;
}

infoService.delete = async (infoId) => {
    await p.query(`delete from finfo where  infoId = ${infoId} `);
}

infoService.addNew = async (data) => {
    var sqlString = `insert into finfo (createDate,updateDate,categoryName,topic,content,url,headImage,infoDes,city,categoryId) 
		value(now(),now(),'${data.categoryName}','${data.topic}','${data.content}','${data.url}','${data.headImage}','${data.infoDes}','${data.city}',${data.categoryId})`;
    await p.query(sqlString);
}

infoService.update = async (data) => {
    await p.query(`update finfo set categoryName = "${data.categoryName}",
		topic = '${data.topic}', content = '${data.content}', url = '${data.url}', headImage = '${data.headImage}'
        , infoDes = '${data.infoDes}', city = '${data.city}', categoryId = ${data.categoryId} where infoId=${data.infoId}` );
}

module.exports = infoService;