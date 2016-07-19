import React from 'react';
import ReactDOM from 'react-dom';
const ReactRouter = require('react-router');
let { Router, Route, Link,IndexRoute } = ReactRouter;
import { Breadcrumb } from 'antd';

import '../common/lib';
import Main from './pages/main';
import Users from './pages/frame/Users';
import CLFrameMenu from './pages/frame/FrameMenu';
import CLFrameRole from './pages/frame/FrameRole';
import SignIn from './pages/signIn';

function requireAuth(nextState, replaceState) {
    var islogin =  sessionStorage.getItem('login');
    if(islogin == 'true'){

    }else{
       replaceState({ nextPathname: nextState.location.pathname }, '/user/login')
    }
}

ReactDOM.render((
    <Router>
        <Route onEnter={requireAuth}  breadcrumbName="首页" name="home" username="首页" path="/" component={Main}>
           <Route name="adminmanager"  breadcrumbName="后台管理" path="backend">
                <Route breadcrumbName="用户管理" name="users"  path="users" component={Users}/>
                <Route breadcrumbName="菜单管理" name="menu"  path="menu" component={CLFrameMenu}/>
                <Route breadcrumbName="角色管理" name="role"  path="role" component={CLFrameRole}/>
           </Route>
        </Route>
        <Route name="user" path="user">
             <Route name="login" path="login" component={SignIn}/>
        </Route>
    </Router>
), document.getElementById('react-content'));
