var Router = require('koa-router');
var router = new Router();

var roleService = require('../../../service/frame/roleService');

router.get('/list', async (ctx) => {
    var q = ctx.query;
    var rows = await roleService.getRolesPage(q.proleId,q.page,q.size);
    var count = await roleService.getRolesCount(q.proleId);

    ctx.body = {"rows":rows,
                       "count":count};
});

router.get('/listByPid',async (ctx) => {
    var q = ctx.query;
    var rows = await roleService.getRoleByPid(q.pid);
    ctx.body = rows;
});

router.get('/allList', async (ctx) => {
    var q = ctx.query;
    var rows = await roleService.getAllRoles();

    ctx.body = rows;
});

router.post('/add', async (ctx) =>{
    var role = ctx.request.body;
    await roleService.addNew(role);
    ctx.body = {
        success : true,
    };
});

router.get('/delete', async (ctx) => {
    var q = ctx.query;
    var id = q.id;
    await roleService.delete(id);
    ctx.body = {
        success : true,
    };
});

router.post('/update', async (ctx) => {
    var role = ctx.request.body;
    await roleService.update(role);
    ctx.body = {
        success : true,
    };
});

router.post('/configRoleMenu', async (ctx) => {
    var roleMenuFormData = ctx.request.body;
    await roleService.configRoleMenu(roleMenuFormData);
    ctx.body = {
        success : true,
    };
});

router.get('/getRoleMenus', async (ctx) => {
    var q = ctx.query;
    var rows =  await roleService.getRoleMenus(q.roleId);
    ctx.body = rows;
});

module.exports = router;
