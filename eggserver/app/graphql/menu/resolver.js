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
    createUser(root, {
        userInput
    }, ctx) {
        ctx.service.user.add('fuser',{
            loginName:userInput.loginName,
            loginPasw:userInput.loginPasw,
            name:userInput.name
        });
      return {loginName:""};
    },

    deleteUser(root, {
        userId
    }, ctx) {
        ctx.service.user.delete('fuser',{userId:userId})
        return {loginName:""};
    },

    updateUser(root, {
      userId,userInput
    }, ctx) {
        ctx.service.user.update('fuser',userInput,{userId:userId});
        return {loginName:""};
    },
  },
};