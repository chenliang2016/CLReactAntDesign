/**
 * Created by cl on 2016/10/19.
 */
import {
    LOGIN_AJAX_START,LOGIN_SUCCESS,LOGIN_FAILURE
} from '../actions/actionType'

export default (state = {loginState:"no", msg:""}, action) => {
    switch (action.type) {
        case LOGIN_AJAX_START:
            return action.payload;
        case LOGIN_SUCCESS:
            return action.payload;
        case LOGIN_FAILURE:
            return action.payload;
        default:
            return state
    }
};