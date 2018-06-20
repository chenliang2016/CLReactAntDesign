// 菜单配置
// headerMenuConfig：头部导航配置

const headerMenuConfig = [
  // {
  //   name: '首页',
  //   path: '/',
  //   icon: 'home',
  // },
  // {
  //   name: '反馈',
  //   path: 'https://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'message',
  // },
  // {
  //   name: '帮助',
  //   path: 'https://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'bangzhu',
  // },
];

// asideMenuConfig：侧边导航配置

const getAsideMenuConfig = () => {
  var menusJson = sessionStorage.getItem('menus');
  const topmenus = JSON.parse(menusJson);

  let asideMenuConfig = []

  if (topmenus == null || topmenus == undefined) {
    asideMenuConfig = [];
  } else{
    const getSubMenus = menu => {
      let subs = menu.subs;
      let submenus = [];
      for (var i = 0; i < subs.length; i++) {
        var sub = subs[i];
        submenus.push({
          name: sub.title,
          path: sub.to,
          icon: menu.icon,
          children: getSubMenus(sub),
        });
      }
      return submenus;
    }

    asideMenuConfig = topmenus.map(function(menu) {
      let realMenu = {
        icon: menu.icon,
        name: menu.title,
        path: menu.to,
      };
      realMenu.children = getSubMenus(menu);
      return realMenu;
    });
  }
  return asideMenuConfig;
};

export { headerMenuConfig, getAsideMenuConfig };
