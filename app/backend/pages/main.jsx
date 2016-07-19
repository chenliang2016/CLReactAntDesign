import React from 'react';
const ReactRouter = require('react-router');
let {Router, Route, Link} = ReactRouter;
import {
    Menu,
    Icon,
    Breadcrumb,
    Dropdown,
    Row,
    Col,
    Popconfirm,
    message
} from 'antd';
const SubMenu = Menu.SubMenu;
import {Ajax} from '../../common/Common';

class App extends React.Component {

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
                    {menu.title} < /span>}>
                    {submenus}
                </SubMenu>
            );
        });

        return (
            <div className="layout-container">
                
                <div className="ant-layout-aside">

                <Row type="flex" align="middle" className="layout-header">
                <Col span="1">
                <div className="layout-logo">
                <img src="images/LOGO.jpg"/>
                </div>
                </Col>
                <Col span="7">
                <div className="top-title">
                后台管理
                </div>
                </Col>
                <Col span="16">
                <div className="top-user">
                <Row type="flex" align="middle" className="top-user">
                <Col span="12">
                <img src="images/head.png" className="imgyuan"/>
                </Col>
                <Col span="12">
                <Popconfirm placement="bottomRight" title="确认注销？" onConfirm={this.confirm}>
                <a className="awhite" href="#">
                {this.state.name}
                <Icon type="poweroff" style={{
                    marginLeft: 10
                }}/>
                </a>
                </Popconfirm>
                </Col>
                </Row>
                </div>
                </Col>
                </Row>

    
                <div className="ant-layout-main">
                    <div className="ant-layout-header">
                        <div className="ant-layout-breadcrumb">
                            <Breadcrumb {...this.props} router={ReactRouter}/>
                        </div>
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <div style={{padding: 20,backgroundColor: "#f0f0f0",minHeight: 777}}>
                                {this.props.children || '首页'}
                            </div>
                        </div>
                         <div className="ant-layout-footer">
                             版权所有 © 2016 由万游引力科技有限公司技术部支持
                         </div>
                    </div>
                </div>
                <aside className="ant-layout-sider">
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} defaultOpenKeys={['users']}>
                {menu}
                </Menu>
                </aside>
                </div>
            </div>
        );
    }
}

export default App;
