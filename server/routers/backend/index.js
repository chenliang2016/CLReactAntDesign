var Router = require('koa-router');
var router = new Router();

router.get('/', function *() {
    yield this.render('admin');
});

module.exports = router;
