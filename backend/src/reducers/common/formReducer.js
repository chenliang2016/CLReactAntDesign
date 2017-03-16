/**
 * Created by cl on 2016/10/20.
 */
import {
    FORM_ADD,FORM_HIDE,FORM_EDIT
} from '../../actions/common/commonActionType'

const initState = {
        visible:false,
        formdata:{},
        formedit:false,
}

export default (state = initState, action) => {
    switch (action.type) {
        case FORM_ADD:
            return action.payload;
        case FORM_EDIT:
            return action.payload;
        case FORM_HIDE:
            return action.payload;
        default:
            return state
    }
};