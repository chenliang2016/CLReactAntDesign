'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    require('./router/user')(app);
    require('./router/menu')(app);
    require('./router/role')(app);
    require('./router/upload')(app);
};
