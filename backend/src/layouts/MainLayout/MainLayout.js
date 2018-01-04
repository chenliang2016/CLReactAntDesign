import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './MainLayout.less';
import LOGO from '../../img/LOGO.png';
import shopIcon from 'img/shop.png'
import activityIcon from 'img/activity.png'
import orderIcon from 'img/order.png'
import configIcon from 'img/config.png'
import userIcon from 'img/user.png'
import accountIcon from 'img/account.png'
import head from '../../img/head.png';
import {replace} from 'react-router-redux'
import {connect} from 'react-redux'

import CLTopMenu from 'components/CLTopMenu'

import {Menu, Breadcrumb, Icon, Popconfirm, Row, Col} from 'antd';
const SubMenu = Menu.SubMenu;

@connect()
class MainLayout extends Component {

    constructor() {
        super();
        var menus = this.getMenus("normal");
        var name = sessionStorage.getItem('name');
        const height =  document.body.clientHeight - 48;
        const contentHeight = height - 48;
        global.contentHeight = contentHeight;
        this.state = {
            menus: menus,
            name: name,
            containerHeight:height,
            contentHeight:contentHeight,
        };
    }

    getMenus = (tag) => {
        var menusJson = sessionStorage.getItem('menus');
        var menus = JSON.parse(menusJson);

        var newMenus = [];

        menus.map((item) => {
            if (item.tag == tag){
                newMenus.push(item);
            }
        })

        return newMenus;
    }

    chooseTopMenu = (tag) => {
        var menus = this.getMenus(tag);
        this.setState({menus:menus});
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
            <Col span={4}>
                <div onClick={() => this.chooseTopMenu("normal")} className={styles.headItem}>
                    <div className={styles.logo}>
                        <span className={styles.logoItem}><img src={LOGO} className={styles.img}/></span><span
                        className={styles.logoItem}>后台管理</span>
                    </div>
                </div>
            </Col>
            <Col span={16}>
                <div className={styles.topMenuCotainer}>
                    <CLTopMenu 
                    onClickMenu = {() => {this.chooseTopMenu("order")}}
                    icon={orderIcon} title="订单管理" />

                    <CLTopMenu 
                    onClickMenu = {() => {this.chooseTopMenu("shop")}}
                    icon={shopIcon} title="店铺管理" />

                    <CLTopMenu 
                    onClickMenu = {() => {this.chooseTopMenu("activity")}}
                    icon={activityIcon} title="运营管理" />

                    <CLTopMenu 
                    onClickMenu = {() => {this.chooseTopMenu("user")}}
                    icon={userIcon} title="用户管理" />

                    <CLTopMenu 
                    onClickMenu = {() => {this.chooseTopMenu("account")}}
                    icon={accountIcon} title="账号管理" />

                    <CLTopMenu 
                    onClickMenu = {() => {this.chooseTopMenu("config")}}
                    icon={configIcon} title="基础配置" />

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
                <Row  style={{height:this.state.containerHeight}}>
                    <Col span={4} style={{height:this.state.containerHeight,overflowY:"auto"}}>
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
                                    <div style={{height: this.state.contentHeight,overflow:"auto"}}>
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
