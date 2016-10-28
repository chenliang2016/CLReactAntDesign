/**
 * Created by cl on 2016/10/27.
 */
import {setTableLoading,setTableNormal,setTableDataSource} from './common/tableAction'
import fetchUtil from '../libs/fetchUtil';
import { replace } from 'react-router-redux';

import {INFO_ADD,INFO_EDIT,INFO_LIST} from './actionType';

const infoAddAction = ()=> {
    return {
        type:INFO_ADD,
        payload:{
            formData:{},
            formedit:false,
        }
    }
};

const infoEditAction = (formdata)=> {
    return {
        type:INFO_EDIT,
        payload:{
            formData:formdata,
            formedit:true,
        }
    }
};

export const infoAdd = () => {
    return dispatch => {
        dispatch(infoAddAction());
    }
};

export const infoEdit = (formdata) => {
    return dispatch => {
        dispatch(infoEditAction(formdata));
    }
};

export const getInfoList = (page,categoryId) => {
    return dispatch => {
        dispatch(setTableLoading())
        let url = `/api/info/list?page=${page}&size=10`;
        if (categoryId){
            url+=`&categoryId=${categoryId}`;
        }
        fetchUtil.get(url)
            .then((rs)=>{
                dispatch(setTableDataSource(INFO_LIST,rs.count,rs.rows));
                dispatch(setTableNormal())
            },e =>{
                dispatch(replace('/user/login'));
                dispatch(setTableNormal())
            });
    }
};

export const deleteInfo = (id) => {
    return dispatch => {
        fetchUtil.get(`/api/info/delete?id=${id}`)
            .then((rs)=>{
                dispatch(getInfoList(1))
            },e =>{
                dispatch(setTableNormal())
            });
    }
};

export const getInfoDetail = (id) => {
    return dispatch => {
        fetchUtil.get(`/api/info/detail?infoId=${id}`)
            .then((rs)=>{
                dispatch(infoEditAction(rs.info))
            },e =>{
                dispatch(setTableNormal())
            });
    }
};