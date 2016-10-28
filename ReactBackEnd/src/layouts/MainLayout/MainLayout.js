import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './MainLayout.less';
import LOGO from '../../img/LOGO.jpg';
import head from '../../img/head.png';
import {replace} from 'react-router-redux'
import {connect} from 'react-redux'

import {Menu, Breadcrumb, Icon, Popconfirm, Row, Col} from 'antd';
const SubMenu = Menu.SubMenu;

@connect()
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

    confirm = ()=> {
        sessionStorage.setItem('login', 'false');
        const {dispatch} = this.props;
        dispatch(replace("/user/login"));
    }

    render() {
        var menus = this.state.menus;
        console.log(menus);
        var menu = menus.map(function (menu) {
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
                <SubMenu key={menu.key} title={<span className={styles.rootMenuTitle}>{menu.title} </span>}>
                    {submenus}
                </SubMenu>
            );
        });

        return (
            <div className={styles.aside}>
                <Row className={styles.header}>
                    <Col span={12}>
                        <div className={styles.headItem}>
                            <div className={styles.logo}>
                                <span className={styles.logoItem}><img src={LOGO} className={styles.img}/></span><span
                                className={styles.logoItem}>后台管理</span>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.headerRight}>
                            <div className={styles.headItem}>
                                <img src={head} className={styles.headItemImg}/>
                            </div>
                            <div className={styles.headItem}>
                                {this.state.name}
                            </div>
                            <div className={styles.headItem}>
                                <Popconfirm placement="bottomRight" title="确认注销？" onConfirm={this.confirm}>
                                    <a href="#" style={{color: "white"}}>
                                        <Icon type="poweroff"/>
                                    </a>
                                </Popconfirm>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div className={styles.sider}>
                            <Menu mode="inline" theme="dark"
                                  defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{fontSize: 15}}>
                                {menu}
                            </Menu>
                        </div>
                    </Col>
                    <Col span={20}>
                        <div>
                            <div>
                                <div>
                                    <div style={{minHeight: 700}}>
                                        {this.props.children || '首页'}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.footer}>
                                版权所有 © 2016 由成倆工作室提供技术支持
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
;

export default MainLayout;
