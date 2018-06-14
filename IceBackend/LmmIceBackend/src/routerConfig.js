// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import AsideLayout from './layouts/AsideLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Auth from './pages/Auth';

import BlankLayout from './layouts/BlankLayout';
import User from './pages/User';
import Menu from './pages/Menu';

const routerConfig = [
  {
    path: '/',
    layout: AsideLayout,
    component: Home,
  },
  {
    path: '/backend/users',
    layout: AsideLayout,
    component: User,
  },
  {
    path: '/backend/menu',
    layout: AsideLayout,
    component: Menu,
  },
  {
    path: '/login',
    component: Auth,
  },
  {
    path: '*',
    layout: AsideLayout,
    component: NotFound,
  },
];

export default routerConfig;
