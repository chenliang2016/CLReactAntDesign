import React, { PropTypes } from 'react';
import { Router, Route,hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';

import store  from './store';

import App from '../layouts/MainLayout/MainLayout';
import SignIn from '../page/signIn';


import Users from '../page/frame/Users';
import CLFrameMenu from '../page/frame/FrameMenu';
import CLFrameRole from '../page/frame/FrameRole';
import InfoList from '../page/info/InfoList';
import InfoAdd from '../page/info/InfoAdd';
import InfoCategory from '../page/info/InfoCategory';

function requireAuth(nextState, replace) {
  var islogin =  sessionStorage.getItem('login');
  if(islogin == 'true'){

  }else{
    replace('/user/login')
  }
}


store.subscribe(() =>
    console.log(store.getState())
);

const history = syncHistoryWithStore(hashHistory, store);

const Routes = () =>
    <Provider store={store}>
        <Router history={history}>
            <Route onEnter={requireAuth}  breadcrumbName="首页" name="home" username="首页" path="/" component={App}>
              <Route name="adminmanager"  breadcrumbName="后台管理" path="backend">
                <Route breadcrumbName="用户管理" name="users"  path="users" component={Users}/>
                <Route breadcrumbName="菜单管理" name="menu"  path="menu" component={CLFrameMenu}/>
                <Route breadcrumbName="角色管理" name="role"  path="role" component={CLFrameRole}/>
              </Route>
              <Route name="info"  breadcrumbName="信息发布" path="info">
                  <Route breadcrumbName="信息类别" name="infoCategory"  path="infoCategory" component={InfoCategory}/>
                  <Route breadcrumbName="信息列表" name="infoList"  path="infoList" component={InfoList}/>
                  <Route breadcrumbName="信息发布" name="infoAdd"  path="infoAdd(/:id)" component={InfoAdd}/>
              </Route>
            </Route>
            <Route name="user" path="user">
              <Route name="login" path="login" component={SignIn}/>
            </Route>
        </Router>
    </Provider>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
