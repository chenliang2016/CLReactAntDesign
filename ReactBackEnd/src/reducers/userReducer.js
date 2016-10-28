/**
 * Created by cl on 2016/10/20.
 */
import {
    USER_LIST,USER_ROLE_FORM_HIDE,USER_ROLE_FORM_SHOW,USER_ROLE_ALL,USER_ROLE_FORM_LOADING
} from '../actions/actionType'

const initState = {
        userlist:[],
        total:0
}

export default (state=initState, action) => {
    switch (action.type) {
        case USER_LIST:
            return Object.assign({},state,action.payload);
        case USER_ROLE_FORM_SHOW:
            return Object.assign({},state,action.payload);
        case USER_ROLE_FORM_HIDE:
            return Object.assign({},state,action.payload);
        case USER_ROLE_ALL:
            return Object.assign({},state,action.payload);
        case USER_ROLE_FORM_LOADING:
            return Object.assign({},state,action.payload);
        default:
            return state
    }
};