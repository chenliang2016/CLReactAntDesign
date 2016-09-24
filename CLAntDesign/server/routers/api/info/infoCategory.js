var Router = require('koa-router');
var router = new Router({prefix: '/api/infoCategory'});

var infoCategoryService = require('../../../service/info/infoCategoryService');

router.get('/list', function* (next) {
    var q = this.request.query;
    var rows = yield infoCategoryService.getInfoCategoryPage(q.pCategoryId,q.page,q.size);
    var count = yield infoCategoryService.getInfoCategorysCount(q.pCategoryId);

    yield this.body = {"rows":rows,
        "count":count};
});

router.get('/listByPid',function* (next){
    var q = this.request.query;
    var rows = yield infoCategoryService.getInfoCategoryByPid(q.pid);
    yield this.body = rows;
});

router.get('/allList', function* (next) {
    var q = this.request.query;
    var rows = yield infoCategoryService.getAllCategory();
    yield this.body = rows;
});

router.post('/add', function* (next){
    var infoC = this.request.body;
    yield infoCategoryService.addNew(infoC);
    yield this.body = {
        success : true,
    };
});

router.get('/delete', function* (next){
    var q = this.request.query;
    var id = q.id;
    yield infoCategoryService.delete(id);
    yield this.body = {
        success : true,
    };
});

router.post('/update', function* (next){
    var infoc = this.request.body;
    yield infoCategoryService.update(infoc);
    yield this.body = {
        success : true,
    };
});


module.exports = router;
