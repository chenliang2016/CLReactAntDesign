module.exports = app => {
    app.router.get('/api/role/list', app.jwt,app.controller.role.list);
    app.router.get('/api/role/listByPid', app.jwt,app.controller.role.listByPid);
    app.router.get('/api/role/allList', app.jwt,app.controller.role.allList);
    app.router.post('/api/role/add', app.jwt,app.controller.role.add);
    app.router.get('/api/role/delete', app.jwt,app.controller.role.delete);
    app.router.post('/api/role/update',app.jwt, app.controller.role.update);
    app.router.post('/api/role/configRoleMenu',app.jwt, app.controller.role.configRoleMenu);
    app.router.get('/api/role/getRoleMenus',app.jwt, app.controller.role.getRoleMenus);
};