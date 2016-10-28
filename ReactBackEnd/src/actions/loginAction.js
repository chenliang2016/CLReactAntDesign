/**
 * Created by cl on 2016/10/20.
 */
import {LOGIN_AJAX_START,LOGIN_SUCCESS,LOGIN_FAILURE} from './actionType'
import { replace } from 'react-router-redux'
import { message } from 'antd';
import fetchUtil from '../libs/fetchUtil';

function loginAjaxStartAction() {
    return {
        type: LOGIN_AJAX_START,
        payload:{
            loginState:"start",
            msg:""
        },
    }
}

function loginSuccessAction() {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            loginState: "success",
            msg: ""
        }
    };
}

function loginFailedAction(msg) {
    return {
        type: LOGIN_FAILURE,
        payload: {
            loginState: "fail",
            msg: msg
        }
    };
}

function loopTreeData(data, pid){
    var result = [], temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].pmenuId == pid) {
            var obj = {
                "title": data[i].name,
                "key":data[i].menuKey,
                "to":data[i].tourl};
            temp = loopTreeData(data, data[i].menuId);
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

export default (username,password) => {
    return dispatch => {
        dispatch(loginAjaxStartAction());

         fetchUtil.post('/auth/login',{
                        username: username,
                        password: password})
              .then((rs)=>{
                    if(rs.success){
                        sessionStorage.setItem('login', 'true');
                        sessionStorage.setItem('name',rs.data.name);
                        sessionStorage.setItem('token',rs.data.token);
                        var menus = loopTreeData(rs.menus,-1);
                        var str = JSON.stringify(menus);
                        sessionStorage.setItem('menus', str);
                        dispatch(loginSuccessAction());
                        dispatch(replace('/'));
                    }else{
                        message.info("用户密码错误");
                        dispatch(loginFailedAction());
                    }
              },e =>{
                  message.info(e);
                  dispatch(loginFailedAction());
              });

    }
}
