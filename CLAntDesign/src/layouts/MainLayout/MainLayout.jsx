import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import styles from './MainLayout.less';

import { Menu, Breadcrumb, Icon,Popconfirm } from 'antd';
const SubMenu = Menu.SubMenu;

class MainLayout extends Component {

  constructor() {
    super();
    var menusJson = sessionStorage.getItem('menus');
    var menus = JSON.parse(menusJson);
    var name = sessionStorage.getItem('name');
    this.state = {
      menus: menus,
      name: name
    };
  }

  confirm = () => {
    sessionStorage.setItem('login', 'false');
    var location = this.props.location;
    this.props.history.replaceState(null, '/user/login')
  }

  render() {

    var menus = this.state.menus;
    var menu = menus.map(function(menu) {
      var submenus = [];
      var subs = menu.subs;
      for (var i = 0; i < subs.length; i++) {
        var sub = subs[i];
        submenus.push(
          <Menu.Item key={sub.key}>
            <Link to={sub.to}>{sub.title}</Link>
          </Menu.Item>
        );
      }

      return (
        <SubMenu key={menu.key} title={< span > <Icon type="appstore"/>
          {menu.title} </span>}>
          {submenus}
        </SubMenu>
      );
    });

    return (
      <div className={styles.aside}>
        <aside className={styles.sider}>
          <div className={styles.logo}>
             <span className={styles.logoItem}><img src="images/LOGO.jpg" className={styles.img}/></span><span className={styles.logoItem}>后台管理</span>
          </div>
          <Menu mode="inline" theme="dark"
                defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
              {menu}
          </Menu>
        </aside>
        <div className={styles.main}>
          <div className={styles.header}>
              <div className={styles.headItem}>
                 <img src="images/head.png" className={styles.headItemImg} />
              </div>
              <div className={styles.headItem}>
                    {this.state.name}
              </div>
              <div className={styles.headItem}>
                   <Popconfirm placement="bottomRight" title="确认注销？" onConfirm={this.confirm}>
                     <a  href="#" style={{color:"white"}}>
                        <Icon type="poweroff" />
                     </a>
                   </Popconfirm>
              </div>
          </div>
          <div className={styles.breadcrumb}>
            <Breadcrumb {...this.props} />
          </div>
          <div className={styles.container}>
            <div className={styles.content}>
              <div style={{ minHeight: 700,backgroundColor:"#eee" }}>
                  {this.props.children || '首页'}
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            版权所有 © 2016 由成倆工作室提供技术支持
          </div>
        </div>
      </div>
    );
  }
};

export default MainLayout;
