'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520384613004_1138';

  // add your config here
  config.middleware = [ 'graphql' ];

  config.upload = {
    localFilePrex: '/Users/chenliang/website/',
    remoteFilePrex: 'http://localhost:7002/',
  }

  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.jwt = {
    secret: 'frameAntDesignToken',
    expiresIn: "30m",
    enable: true, // default is false
    // match: ['/api/menu/*','/graphql'], // �optional
    match: ['/api/menu/*'], // �optional
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '11111',
      // 数据库名
      database: 'NewLmmFrame',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    onPreGraphQL: function* (ctx) {},
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    onPreGraphiQL: function* (ctx) {},
  };

  return config;
};