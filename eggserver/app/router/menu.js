module.exports = app => {
    app.router.get('/api/menu/list', app.jwt,app.controller.menu.list);
    app.router.get('/api/menu/listByPid', app.jwt,app.controller.menu.listByPid);
    app.router.get('/api/menu/allList', app.jwt,app.controller.menu.allList);
    app.router.post('/api/menu/add', app.jwt,app.controller.menu.add);
    app.router.get('/api/menu/delete', app.jwt,app.controller.menu.delete);
    app.router.post('/api/menu/update',app.jwt, app.controller.menu.update);
};