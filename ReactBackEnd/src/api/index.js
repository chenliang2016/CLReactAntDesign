/**
 * Created by cl on 2016/10/18.
 */

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { constant } from '../libs/constant';

import {Ajax} from '../libs/common';

function status(response){
    console.log(response.status);
    if(response.status>=200 && response.status<300){
        return Promise.resolve(response);
    }
    else{
        return Promise.reject(new Error(response.statusText));
    }
}

function json(response){
    return response.json();
}

const userLogin = (username,password) => {
    // source file is iso-8859-15 but it is converted to utf-8 automatically

    const url = constant.urlPrex+'/auth/login';

    // fetch(url,{
    //     method:"post",
    //     body:`username=${username}&password=${password}`
    // })
    // .then(status)
    // .then(json)
    // .then(function(data){
    //     console.log("请求成功，JSON解析后的响应数据为:",data);
    // })
    // .catch(function(err){
    //         console.log("Fetch错误:"+err);
    // });

    const data = {
        username:username,
        password:password
    }

    Ajax.post('/auth/login', data).then((d) => {

        sessionStorage.setItem('login', 'true');
        sessionStorage.setItem('name',d.data.name);
        sessionStorage.setItem('token',d.data.token);

        if (d.success) {

            var menus = this.loopTreeData(d.menus,-1);
            var str = JSON.stringify(menus);
            sessionStorage.setItem('menus', str);
            if (location.state && location.state.nextPathname) {
                router.replace(location.state.nextPathname);
            } else {
                router.replace('/');
            }
        }else{
            message.info('用户密码错误');
        }
    });

};

export default userLogin;