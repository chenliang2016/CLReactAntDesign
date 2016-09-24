import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../layouts/MainLayout/MainLayout';
import SignIn from '../pages/signIn';
import Users from '../pages/frame/Users';
import CLFrameMenu from '../pages/frame/FrameMenu';
import CLFrameRole from '../pages/frame/FrameRole';

import InfoList from '../pages/info/InfoList';
import InfoAdd from '../pages/info/InfoAdd';
import InfoCategory from '../pages/info/InfoCategory';

function requireAuth(nextState, replaceState) {
  var islogin =  sessionStorage.getItem('login');
  if(islogin == 'true'){

  }else{
    replaceState({ nextPathname: nextState.location.pathname }, '/user/login')
  }
}

const Routes = ({ history }) =>
  <Router>
    <Route onEnter={requireAuth}  breadcrumbName="首页" name="home" username="首页" path="/" component={App}>
      <Route name="adminmanager"  breadcrumbName="后台管理" path="backend">
        <Route breadcrumbName="用户管理" name="users"  path="users" component={Users}/>
        <Route breadcrumbName="菜单管理" name="menu"  path="menu" component={CLFrameMenu}/>
        <Route breadcrumbName="角色管理" name="role"  path="role" component={CLFrameRole}/>
      </Route>
      <Route name="info"  breadcrumbName="信息发布" path="info">
          <Route breadcrumbName="信息类别" name="infoCategory"  path="infoCategory" component={InfoCategory}/>
          <Route breadcrumbName="信息列表" name="infoList"  path="infoList" component={InfoList}/>
          <Route breadcrumbName="信息发布" name="infoAdd"  path="infoAdd" component={InfoAdd}/>
      </Route>
    </Route>
    <Route name="user" path="user">
      <Route name="login" path="login" component={SignIn}/>
    </Route>
  </Router>;



Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
