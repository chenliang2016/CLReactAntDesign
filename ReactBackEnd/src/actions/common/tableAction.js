/**
 * Created by cl on 2016/10/27.
 */
import {TABLE_LOADING,TABLE_NORMAL} from './commonActionType'

function dataSourceAction(type,total,rows) {
    return {
        type: type,
        payload: {
            dataSource:rows,
            total:total
        }
    }
}

const tableLoadingAction = ()=> {
    return {
        type: TABLE_LOADING,
        payload: {
            loading:true
        }
    }
}

const tableNormalAction = ()=> {
    return {
        type: TABLE_NORMAL,
        payload: {
            loading:false
        }
    }
}

export const setTableLoading=() => {
    return dispatch => {
        dispatch(tableLoadingAction());
    }
};

export const setTableNormal=() =>{
    return dispatch => {
        dispatch(tableNormalAction());
    }
};

export const setTableDataSource=(type,total,rows) => {
    return dispatch => {
        dispatch(dataSourceAction(type,total,rows));
    }
};