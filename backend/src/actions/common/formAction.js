/**
 * Created by cl on 2016/10/20.
 */
import {FORM_ADD,FORM_EDIT,FORM_HIDE} from './commonActionType'

const formEditAction = (formdata)=> {
    return {
        type: FORM_EDIT,
        payload: {
            visible:true,
            formdata:formdata,
            formedit:true,
        }
    }
};

const formAddAction= ()=> {
    return {
        type: FORM_ADD,
        payload: {
            visible:true,
            formdata:{},
            formedit:false,
        }
    }
};

const formHideAction = ()=> {
    return {
        type: FORM_HIDE,
        payload: {
            visible:false,
            formdata:{},
            formedit:false,
        }
    }
};

export const formAdd=() => {
    return dispatch => {
        dispatch(formAddAction());
    }
};

export const formEdit=(formdata) =>{
    return dispatch => {
        dispatch(formEditAction(formdata));
    }
};

export const formHide=() => {
    return dispatch => {
        dispatch(formHideAction());
    }
};
