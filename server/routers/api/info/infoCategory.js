var Router = require('koa-router');
var router = new Router();

var infoCategoryService = require('../../../service/info/infoCategoryService');

router.get('/list', async (ctx) => {
    var q = ctx.query;
    var rows = await infoCategoryService.getInfoCategoryPage(q.pCategoryId,q.page,q.size);
    var count = await infoCategoryService.getInfoCategorysCount(q.pCategoryId);

    ctx.body = {"rows":rows,
        "count":count};
});

router.get('/listByPid',async (ctx) =>{
    var q = ctx.query;
    var rows = await infoCategoryService.getInfoCategoryByPid(q.pid);
    ctx.body = rows;
});

router.get('/allList', async (ctx) => {
    var q = ctx.query;
    var rows = await infoCategoryService.getAllCategory();
    ctx.body = rows;
});

router.post('/add', async (ctx) =>{
    var infoC = ctx.request.body;
    await infoCategoryService.addNew(infoC);
    ctx.body = {
        success : true,
    };
});

router.get('/delete', async (ctx) =>{
    var q = ctx.query;
    var id = q.id;
    await infoCategoryService.delete(id);
    ctx.body = {
        success : true,
    };
});

router.post('/update', async (ctx) =>{
    var infoc = ctx.request.body;
    await infoCategoryService.update(infoc);
    ctx.body = {
        success : true,
    };
});


module.exports = router;
