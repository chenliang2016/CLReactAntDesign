var Router = require('koa-router');
var router = new Router({prefix: '/api/role'});

var roleService = require('../../../service/frame/roleService');

router.get('/list', function* (next) {
    var q = this.request.query;
    var rows = yield roleService.getRolesPage(q.proleId,q.page,q.size);
    var count = yield roleService.getRolesCount(q.proleId);

    yield this.body = {"rows":rows,
                       "count":count};
});

router.get('/listByPid',function* (next){
    var q = this.request.query;
    var rows = yield roleService.getRoleByPid(q.pid);
    yield this.body = rows;
});

router.get('/allList', function* (next) {
    var q = this.request.query;
    var rows = yield roleService.getAllRoles();

    yield this.body = rows;
});

router.post('/add', function* (next){
    var role = this.request.body;
    yield roleService.addNew(role);
    yield this.body = {
        success : true,
    };
});

router.get('/delete', function* (next){
    var q = this.request.query;
    var id = q.id;
    yield roleService.delete(id);
    yield this.body = {
        success : true,
    };
});

router.post('/update', function* (next){
    var role = this.request.body;
    yield roleService.update(role);
    yield this.body = {
        success : true,
    };
});

router.post('/configRoleMenu', function* (next){
    var roleMenuFormData = this.request.body;
    yield roleService.configRoleMenu(roleMenuFormData);
    yield this.body = {
        success : true,
    };
});

router.get('/getRoleMenus', function* (next){
    var q = this.request.query;
    console.log(q.roleId);
    var rows =  yield roleService.getRoleMenus(q.roleId);
    yield this.body = rows;
});

module.exports = router;
