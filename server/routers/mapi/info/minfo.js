/**
 * Created by cl on 2016/10/9.
 */
var Router = require('koa-router');
var router = new Router({prefix: '/api/m/info'});

var infoService = require('../../../service/info/infoService');

router.get('/list', function* (next){
    var q = this.request.query;
    var rows = yield infoService.getInfoPageByCategoryName(q.categoryName,q.page,q.size);

    yield this.body = {ret:200,
                        data:rows,msg:""};
});

router.get('/detail' ,function * (next) {
    var q = this.request.query;
    var info = yield infoService.getInfoById(q.infoId);
    yield this.body = {ret:200,
        data:info,msg:""};
});

module.exports = router;
