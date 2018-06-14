'use strict';
module.exports = {
  Query: {
    menu(root,{pmenuId,page,size} ,ctx) {
      let menuList = ctx.connector.menu.getMenuList(pmenuId,page,size);
      let menuCount = ctx.connector.menu.getMenuCount(pmenuId); 

      return {
          count:menuCount,
          menulist:menuList,
      };
    },

    allmenu(root,{},ctx){
        let menuList = ctx.connector.menu.getAllMenu();
        return menuList;
    }
  },

  Mutation: {
    createMenu(root, {
        menuInput
    }, ctx) {
        ctx.service.menu.add('fmenu',{
            name:menuInput.name,
            pmenuId:menuInput.pmenuId,
            orderNum:menuInput.orderNum,
            tourl:menuInput.tourl
        });
        return true;
    },

    deleteMenu(root, {
        menuId
    }, ctx) {
        ctx.service.menu.delete('fmenu',{menuId:menuId})
        return true;
    },

    updateMenu(root, {
      menuId,menuInput
    }, ctx) {
        ctx.service.menu.update('fmenu',menuInput,{menuId:menuId});
        return true;
    },
  },
};