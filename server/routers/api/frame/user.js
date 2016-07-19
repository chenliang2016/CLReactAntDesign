var Router = require('koa-router');
var router = new Router();

var p = require('../../../database/mysqlUtil');
var userService = require('../../../service/frame/userService');

router.get('/user/list', function* (next) {
    var q = this.request.query;
    var rows = yield userService.getUsersPage(q.page,q.size);
    var count = yield userService.getUsersCount();

    yield this.body = {"rows":rows,
                       "count":count};
});

router.post('/user/add', function* (next){
    var user = this.request.body;
    yield userService.addNew(user);
    yield this.body = {
        success : true,
    };
});

router.get('/user/delete', function* (next){

    var q = this.request.query;
    var userId = q.userId;

    yield userService.delete(userId);
    yield this.body = {
        success : true,
    };
});

router.post('/user/update', function* (next){
    var user = this.request.body;
    yield userService.update(user);
    yield this.body = {
        success : true,
    };
});

router.post('/user/configUserRole', function* (next){
    var userRoleFormData = this.request.body;
    yield userService.configUserRole(userRoleFormData);
    yield this.body = {
        success : true,
    };
});

router.get('/user/getUserRoles', function* (next){
    var q = this.request.query;
    var rows =  yield userService.getUserRoles(q.userId);
    yield this.body = rows;
});

router.get('/user/getUserMenus', function*(next){
    var q = this.request.query;
    var rows =  yield userService.getUserMenus(q.userId);
    yield this.body = rows;
})

module.exports = router;
