var Router = require('koa-router');
var router = new Router();

var infoService = require('../../../service/info/infoService');

router.get('/list', async (ctx) =>{
    var q = ctx.query;
    var rows = await infoService.getInfoPage(q.categoryId,q.page,q.size);
    var count = await infoService.getInfoCount(q.categoryId);

    ctx.body = {"rows":rows,
        "count":count};
});

router.get('/detail' ,async (ctx) => {
    var q = ctx.query;
    var info = await infoService.getInfoById(q.infoId);
    ctx.body = {"info":info};
});

router.post('/add', async (ctx) =>{
    var info = ctx.request.body;
    await infoService.addNew(info);
    ctx.body = {
        success : true,
    };
});

router.get('/delete', async (ctx) =>{
    var q = ctx.query;
    var id = q.id;
    await infoService.delete(id);
    ctx.body = {
        success : true,
    };
});

router.post('/update', async (ctx) =>{
    var info = ctx.request.body;
    await infoService.update(info);
    ctx.body = {
        success : true,
    };
});


module.exports = router;
