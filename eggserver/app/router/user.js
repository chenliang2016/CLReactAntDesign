module.exports = app => {
    app.router.post('/api/auth/login', app.controller.user.login);
    app.router.get('/api/user/list', app.jwt,app.controller.user.list);
    app.router.post('/api/user/add', app.jwt,app.controller.user.add);
    app.router.get('/api/user/delete', app.jwt,app.controller.user.delete);
    app.router.post('/api/user/update', app.jwt,app.controller.user.update);
    app.router.post('/api/user/configUserRole', app.jwt,app.controller.user.configUserRole);
    app.router.get('/api/user/getUserRoles', app.jwt,app.controller.user.getUserRoles);
    app.router.get('/api/user/getUserMenus', app.jwt,app.controller.user.getUserMenus);
};