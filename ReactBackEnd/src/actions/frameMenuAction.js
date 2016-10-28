/**
 * Created by cl on 2016/10/21.
 */
import {MENU_LIST} from './actionType'
import fetchUtil from '../libs/fetchUtil';
import { replace } from 'react-router-redux'
import {setTableNormal,setTableLoading} from './common/tableAction'

function menuListaction(total,rows) {
    return {
        type: MENU_LIST,
        payload: {
            menulist:rows,
            total:total
        }
    }
}

export const getMenuList = (page,pmenuId) => {
    return dispatch => {
        dispatch(setTableLoading())
        let url = `/api/menu/list?page=${page}&size=10`;
        if (pmenuId != undefined){
            url+=`&pmenuId=${pmenuId}`
        }
        fetchUtil.get(url)
            .then((rs)=>{
                dispatch(menuListaction(rs.count,rs.rows));
                dispatch(setTableNormal())
            },e =>{
                dispatch(replace('/user/login'));
                dispatch(setTableNormal())
            });
    }
};

export const deleteMenu = (menuId) => {
    return dispatch => {
        fetchUtil.get(`/api/menu/delete?id=${menuId}`)
            .then((rs)=>{
                dispatch(getMenuList(1))
            },e =>{
                dispatch(setTableNormal())
            });
    }
};