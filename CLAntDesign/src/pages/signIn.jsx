import React from 'react';
import {Ajax} from '../libs/common';
import styles from './signIn.less';
import { message } from 'antd';


class SignIn extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();

        var username = this.refs.name.value
        var password = this.refs.pass.value

        var data = {
            "username": username,
            "password": password
        }

        var self = this;
        var location = self.props.location;

        Ajax.post('/auth/login', data).then((d) => {

            sessionStorage.setItem('login', 'true');
            sessionStorage.setItem('name',d.data.name);

            if (d.success) {

                var menus = this.loopTreeData(d.menus,-1);
                var str = JSON.stringify(menus);
                sessionStorage.setItem('menus', str);
                if (location.state && location.state.nextPathname) {
                    self.props.history.replaceState(null, location.state.nextPathname)
                } else {
                    self.props.history.replaceState(null, '/')
                }
            }else{
                message.info('用户密码错误');
            }
        });
    }

    loopTreeData(data, pid){
        var result = [], temp;
        for (var i = 0; i < data.length; i++) {
            if (data[i].pmenuId == pid) {
                var obj = {
                    "title": data[i].name,
                    "key":data[i].menuKey,
                    "to":data[i].tourl};
                temp = this.loopTreeData(data, data[i].menuId);
                if (temp!=undefined) {
                    if (temp.length > 0) {
                    obj.subs = temp;
                    }else{
                        obj.subs = [];
                    }
                }else{
                        obj.subs = [];
                }
                result.push(obj);
            }
        }
        return result;
    }

    render() {
        return <div className={styles.LoginContainer}>
                  <section className={styles.container}>
                            <h2>后台管理登录</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input className={styles.input} type="text" ref="name" placeholder="请输入用户名"/>
                                <input className={styles.input} type="password" ref="pass" placeholder="请输入密码"/>
                                <button onClick={this.handleSubmit}>登录</button>
                            </form>
                 </section>
            </div>
    }
}

export default SignIn;
