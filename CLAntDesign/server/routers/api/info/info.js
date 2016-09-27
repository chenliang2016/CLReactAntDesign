var Router = require('koa-router');
var router = new Router({prefix: '/api/info'});

var infoService = require('../../../service/info/infoService');

router.get('/list', function* (next){
    var q = this.request.query;
    var rows = yield infoService.getInfoPage(q.categoryId,q.page,q.size);
    var count = yield infoService.getInfoCount(q.categoryId);

    yield this.body = {"rows":rows,
        "count":count};
});

router.get('/detail' ,function * (next) {
    var q = this.request.query;
    var info = yield infoService.getInfoById(q.infoId);
    console.log(info);
    yield this.body = {"info":info};
});

router.post('/add', function* (next){
    var info = this.request.body;
    yield infoService.addNew(info);
    yield this.body = {
        success : true,
    };
});

router.get('/delete', function* (next){
    var q = this.request.query;
    var id = q.id;
    yield infoService.delete(id);
    yield this.body = {
        success : true,
    };
});

router.post('/update', function* (next){
    var info = this.request.body;
    yield infoService.update(info);
    yield this.body = {
        success : true,
    };
});


module.exports = router;
