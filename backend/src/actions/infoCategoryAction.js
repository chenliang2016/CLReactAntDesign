/**
 * Created by cl on 2016/10/27.
 */
import {setTableLoading,setTableNormal,setTableDataSource} from './common/tableAction'
import fetchUtil from '../libs/fetchUtil';
import { replace } from 'react-router-redux'
import {INFOC_LIST} from './actionType'

export const getInfoCList = (page,pCategoryId) => {
    return dispatch => {
        dispatch(setTableLoading())
        let url = `/api/infoCategory/list?page=${page}&size=10`;
        if (pCategoryId){
            url+=`&pCategoryId=${pCategoryId}`;
        }
        fetchUtil.get(url)
            .then((rs)=>{
                dispatch(setTableDataSource(INFOC_LIST,rs.count,rs.rows));
                dispatch(setTableNormal())
            },e =>{
                dispatch(replace('/user/login'));
                dispatch(setTableNormal())
            });

    }
}

export const deleteInfoC = (id) => {
    return dispatch => {
        fetchUtil.get(`/api/infoCategory/delete?id=${id}`)
            .then((rs)=>{
                dispatch(getInfoCList(1))
            },e =>{
                dispatch(setTableNormal())
            });
    }
}