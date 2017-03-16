/**
 * Created by cl on 2016/10/21.
 */
import {
    ROLE_LIST,ROLE_MENU_FORM_SHOW,ROLE_MENU_FORM_HIDE,ROLE_MENU_FORM_LOADING,ROLE_MENU_ALL
} from '../actions/actionType'

const initState = {
    rolelist:[],
    total:0
}

export default (state=initState , action) =>{
    switch (action.type) {
        case ROLE_LIST:
            return Object.assign({},state,{
                rolelist:action.payload.dataSource,
                total:action.payload.total,
            });
        case ROLE_MENU_FORM_SHOW:
            return Object.assign({},state,action.payload);
        case ROLE_MENU_FORM_HIDE:
            return Object.assign({},state,action.payload);
        case ROLE_MENU_FORM_LOADING:
            return Object.assign({},state,action.payload);
        case ROLE_MENU_ALL:
            return Object.assign({},state,action.payload);
        default:
            return state;
    }

}