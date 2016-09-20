var Router = require('koa-router');
var router = new Router({
    prefix: '/admin'
});

router.get('/', function *(next) {
    console.log("admin");
    yield this.render('index');
});

module.exports = router;
