var Router = require('koa-router');
var router = new Router();

var p = require('../../../database/mysqlUtil');
var userService = require('../../../service/frame/userService');

router.get('/list', async (ctx) =>{
    var q = ctx.query;
    var rows = await userService.getUsersPage(q.page,q.size);
    var count = await userService.getUsersCount();

    ctx.body = {"rows":rows,
                       "count":count};
});

router.post('/add', async (ctx) =>{
    var user = ctx.request.body;
    await userService.addNew(user);
    ctx.body = {
        success : true,
    };
});

router.get('/delete', async (ctx) =>{

    var q = ctx.query;
    var userId = q.userId;

    await userService.delete(userId);
    ctx.body = {
        success : true,
    };
});

router.post('/update', async (ctx) =>{
    var user = ctx.request.body;
    await userService.update(user);
    ctx.body = {
        success : true,
    };
});

router.post('/configUserRole', async (ctx) =>{
    var userRoleFormData = ctx.request.body;
    await userService.configUserRole(userRoleFormData);
    ctx.body = {
        success : true,
    };
});

router.get('/getUserRoles', async (ctx) =>{
    var q = ctx.query;
    var rows =  await userService.getUserRoles(q.userId);
    ctx.body = rows;
});

router.get('/getUserMenus', async (ctx) =>{
    var q = ctx.query;
    var rows =  await userService.getUserMenus(q.userId);
    ctx.body = rows;
})

module.exports = router;
