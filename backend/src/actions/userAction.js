/**
 * Created by cl on 2016/10/20.
 */
import {USER_LIST,USER_ROLE_FORM_SHOW,USER_ROLE_FORM_HIDE,USER_ROLE_ALL,USER_ROLE_FORM_LOADING} from './actionType'
import fetchUtil from '../libs/fetchUtil';
import { replace } from 'react-router-redux'
import {setTableNormal,setTableLoading} from './common/tableAction'

function userListaction(total,rows) {
    return {
        type: USER_LIST,
        payload: {
            userlist:rows,
            total:total
        }
    }
}

function showUserRoleFormAction(userId,userroleKeys) {
    return {
        type:USER_ROLE_FORM_SHOW,
        payload:{
            userroleVisible:true,
            chooseUserId:userId,
            userrolekeys:userroleKeys,
        }
    }
}

function hideUserRoleFormAction() {
    return {
        type:USER_ROLE_FORM_HIDE,
        payload:{
            userroleVisible:false,
            chooseUserId:0,
            userrolekeys:[],
        }
    }
}

function UserRoleFormLoadingAction(loading) {
    return {
        type:USER_ROLE_FORM_LOADING,
        payload:{
            roleformloading:loading
        }
    }
}



function getAllUserRoleAction(treedata) {
    return {
        type:USER_ROLE_ALL,
        payload:{
            treedata:treedata,
        }
    }
}

export const getUserList = (page) => {
    return dispatch => {
        dispatch(setTableLoading())
        fetchUtil.get(`/api/user/list?page=${page}&size=10`)
            .then((rs)=>{
                dispatch(userListaction(rs.count,rs.rows));
                dispatch(setTableNormal())
            },e =>{
                dispatch(replace('/user/login'));
                dispatch(setTableNormal())
            });

    }
};

export const deleteUser = (userId) => {
    return dispatch => {
        fetchUtil.get(`/api/user/delete?userId=${userId}`)
            .then((rs)=>{
                dispatch(getUserList(1))
            },e =>{
                dispatch(setTableNormal())
            });
    }
};

export const showUserRoleForm = (userId) =>{
    return dispatch => {
        fetchUtil.get(`/api/user/getUserRoles?userId=${userId}`)
            .then((rs)=>{
                var defaultKeys = [];
                for (var i = 0; i < rs.length; i++) {
                    var roleid = rs[i].roleId;
                    defaultKeys.push(roleid);
                };
                dispatch(showUserRoleFormAction(userId,defaultKeys));
            },e =>{

            });
    };
};

export const hideUserRoleForm = () =>{
    return dispatch => {
        dispatch(hideUserRoleFormAction());
        dispatch(getUserList(1))
    }
};

export const getAllUserRole = () => {
    return dispatch => {
        fetchUtil.get(`/api/role/allList`)
            .then((d)=>{
                d = loopTreeData(d,-1);
                dispatch(getAllUserRoleAction(d));
            },e =>{

            });
    };
}

function loopTreeData(data, pid) {
    var result = [], temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].proleId == pid) {
            var obj = {name: data[i].name,"roleId": data[i].roleId,"key":data[i].roleId};
            temp = loopTreeData(data, data[i].roleId);
            if (temp.length > 0) {
                obj.children = temp;
            }
            result.push(obj);
        }
    }
    return result;
};

export const configUserRole = (userId,roles) => {
    return dispatch => {
        dispatch(UserRoleFormLoadingAction(true));
        fetchUtil.post(`/api/user/configUserRole`,{roles:roles,userId:userId})
            .then((d)=>{
                if (d.success) {
                    dispatch(hideUserRoleFormAction());
                    dispatch(UserRoleFormLoadingAction(false));
                } else {
                    dispatch(hideUserRoleFormAction());
                    dispatch(UserRoleFormLoadingAction(false));
                }
            },e =>{

            });
    };
};



