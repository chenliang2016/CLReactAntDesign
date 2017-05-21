var Router = require('koa-router');
var router = new Router();

var menuService = require('../../../service/frame/menuService');

router.get('/list', async (ctx) => {
    var q = ctx.query;
    var rows = await menuService.getMenusPage(q.pmenuId,q.page,q.size);
    var count = await menuService.getMenusCount(q.pmenuId);

    ctx.body = {"rows":rows,
                       "count":count};
});

router.get('/listByPid',async (ctx) => {
    var q = ctx.query;
    var rows = await menuService.getMenuByPid(q.pid);
    ctx.body = rows;
});

router.get('/allList', async (ctx) =>  {
    var q = ctx.query;
    var rows = await menuService.getAllMenu();
    ctx.body = rows;
});

router.post('/add', async (ctx) => {
    var menu = ctx.request.body;
    await menuService.addNew(menu);
    ctx.body = {
        success : true,
    };
});

router.get('/delete', async (ctx) => {
    var q = ctx.query;
    var id = q.id;
    await menuService.delete(id);
    ctx.body = {
        success : true,
    };
});

router.post('/update', async (ctx) => {
    var menu = ctx.request.body;
    await menuService.update(menu);
    ctx.body = {
        success : true,
    };
});


module.exports = router;
