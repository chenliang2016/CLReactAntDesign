'use strict';
module.exports = {
  Query: {
    user(root,{page,size} ,ctx) {
      let userlist = ctx.connector.user.getUserList(page,size);
      let userCount = ctx.connector.user.getUserCount(); 
      
      return {
          count:userCount,
          userlist:userlist,
      };
    },

    userRoles(root,{userId} ,ctx) {
        let userRole = ctx.connector.user.getUserRoles(userId);
        return userRole;
    },

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

    configUserRole(root, {
        userId,
        userRoles
      }, ctx) {
          let data = {
            userId:userId,
            roles:userRoles
          }
          ctx.service.user.configUserRole(data);
          return true;
    },
    
  },
};