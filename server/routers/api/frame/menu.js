var Router = require('koa-router');
var router = new Router();

var menuService = require('../../../service/frame/menuService');

router.get('/menu/list', function* (next) {
    var q = this.request.query;
    var rows = yield menuService.getMenusPage(q.pmenuId,q.page,q.size);
    var count = yield menuService.getMenusCount(q.pmenuId);

    yield this.body = {"rows":rows,
                       "count":count};
});

router.get('/menu/listByPid',function* (next){
    var q = this.request.query;
    var rows = yield menuService.getMenuByPid(q.pid);
    yield this.body = rows;
});

router.get('/menu/allList', function* (next) {
    var q = this.request.query;
    var rows = yield menuService.getAllMenu();
    yield this.body = rows;
});

router.post('/menu/add', function* (next){
    var menu = this.request.body;
    yield menuService.addNew(menu);
    yield this.body = {
        success : true,
    };
});

router.get('/menu/delete', function* (next){
    var q = this.request.query;
    var id = q.id;
    yield menuService.delete(id);
    yield this.body = {
        success : true,
    };
});

router.post('/menu/update', function* (next){
    var menu = this.request.body;
    yield menuService.update(menu);
    yield this.body = {
        success : true,
    };
});


module.exports = router;
