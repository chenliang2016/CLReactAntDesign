var Router = require('koa-router');
var router = new Router();

var roleService = require('../../../service/frame/roleService');

router.get('/role/list', function* (next) {
    var q = this.request.query;
    var rows = yield roleService.getRolesPage(q.proleId,q.page,q.size);
    var count = yield roleService.getRolesCount(q.proleId);

    yield this.body = {"rows":rows,
                       "count":count};
});

router.get('/role/listByPid',function* (next){
    var q = this.request.query;
    var rows = yield roleService.getRoleByPid(q.pid);
    yield this.body = rows;
});

router.get('/role/allList', function* (next) {
    var q = this.request.query;
    var rows = yield roleService.getAllRoles();

    yield this.body = rows;
});

router.post('/role/add', function* (next){
    var role = this.request.body;
    yield roleService.addNew(role);
    yield this.body = {
        success : true,
    };
});

router.get('/role/delete', function* (next){
    var q = this.request.query;
    var id = q.id;
    yield roleService.delete(id);
    yield this.body = {
        success : true,
    };
});

router.post('/role/update', function* (next){
    var role = this.request.body;
    yield roleService.update(role);
    yield this.body = {
        success : true,
    };
});

router.post('/role/configRoleMenu', function* (next){
    var roleMenuFormData = this.request.body;
    yield roleService.configRoleMenu(roleMenuFormData);
    yield this.body = {
        success : true,
    };
});

router.get('/role/getRoleMenus', function* (next){
    var q = this.request.query;
    var rows =  yield roleService.getRoleMenus(q.roleId);
    yield this.body = rows;
});

module.exports = router;
