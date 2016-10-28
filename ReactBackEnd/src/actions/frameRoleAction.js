/**
 * Created by cl on 2016/10/21.
 */
import fetchUtil from '../libs/fetchUtil';
import { replace } from 'react-router-redux'
import {setTableNormal,setTableLoading,setTableDataSource} from './common/tableAction'

import {ROLE_MENU_ALL,ROLE_MENU_FORM_SHOW,ROLE_MENU_FORM_HIDE,ROLE_MENU_FORM_LOADING,ROLE_LIST} from './actionType'

const RoleMenuFormLoadingAction = (state) => {
    return {
        type:ROLE_MENU_FORM_LOADING,
        payload:{
            menuformloading:state,
        }
    }
}

const showRoleMenuFormAction = (roleId,roleMenuKeys) => {
    return {
        type:ROLE_MENU_FORM_SHOW,
        payload:{
            roleMenuVisible:true,
            chooseRoleId:roleId,
            roleMenuKeys:roleMenuKeys,
        }
    }
}

const hideRoleMenuFormAction = () => {
    return {
        type:ROLE_MENU_FORM_HIDE,
        payload:{
            roleMenuVisible:false,
            chooseRoleId:"",
            roleMenuKeys:[],
        }
    }
}

function getAllRoleMenuAction(treedata) {
    return {
        type:ROLE_MENU_ALL,
        payload:{
            treedata:treedata,
        }
    }
}

export const getRoleList = (page,proleId) => {
    return dispatch => {
        dispatch(setTableLoading())
        let url = `/api/role/list?page=${page}&size=10`;
        if (proleId != undefined){
            url+=`&proleId=${proleId}`
        }
        fetchUtil.get(url)
            .then((rs)=>{
                dispatch(setTableDataSource(ROLE_LIST,rs.count,rs.rows));
                dispatch(setTableNormal())
            },e =>{
                dispatch(replace('/user/login'));
                dispatch(setTableNormal())
            });
    }
};

export const deleteRole= (roleId) => {
    return dispatch => {
        fetchUtil.get(`/api/role/delete?id=${roleId}`)
            .then((rs)=>{
                dispatch(getRoleList(1))
            },e =>{
                dispatch(setTableNormal())
            });
    }
};

export const showRoleMenuForm = (roleId) =>{
    return dispatch => {
        fetchUtil.get(`/api/role/getRoleMenus?roleId=${roleId}`)
            .then((rs)=>{
                var defaultKeys = [];
                for (var i = 0; i < rs.length; i++) {
                    var menuId = rs[i].menuId;
                    defaultKeys.push(menuId);
                };

                dispatch(showRoleMenuFormAction(roleId,defaultKeys));
            },e =>{

            });
    };
};

export const hideRoleMenuForm = () => {
    return dispatch => {
        dispatch(hideRoleMenuFormAction());
    };
};

export const getAllRoleMenu = () => {
    return dispatch => {
        fetchUtil.get(`/api/menu/allList`)
            .then((d)=>{
                d = loopTreeData(d,-1);
                dispatch(getAllRoleMenuAction(d));
            },e =>{

            });
    };
}

function loopTreeData(data, pid) {
    var result = [], temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].pmenuId == pid) {
            var obj = {name: data[i].name,"menuId": data[i].menuId,"key":data[i].menuId};
            temp = loopTreeData(data, data[i].menuId);
            if (temp.length > 0) {
                obj.children = temp;
            }
            result.push(obj);
        }
    }
    return result;
};

export const configRoleMenu = (roleId,menus) => {
    return dispatch => {
        dispatch(RoleMenuFormLoadingAction(true));
        fetchUtil.post(`/api/role/configRoleMenu`,{menus:menus,roleId:roleId})
            .then((d)=>{
                if (d.success) {
                    dispatch(hideRoleMenuFormAction());
                    dispatch(RoleMenuFormLoadingAction(false));
                } else {
                    dispatch(hideUserRoleFormAction());
                    dispatch(RoleMenuFormLoadingAction(false));
                }
            },e =>{

            });
    };
};