/**
 * Created by cl on 2016/10/21.
 */
import {
    MENU_LIST
} from '../actions/actionType'

const initState = {
    menulist:[],
    total:0
}

export default (state=initState , action) =>{
    switch (action.type) {
        case MENU_LIST:
            return Object.assign({},state,action.payload);
        default:
            return state;
    }

}