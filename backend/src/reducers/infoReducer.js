/**
 * Created by cl on 2016/10/27.
 */
import {
    INFO_ADD,INFO_EDIT,INFO_LIST
} from '../actions/actionType'

const initState = {
    formData:{},
    infoList:[],
    total:0,
}

export default (state=initState, action) => {
    switch (action.type) {
        case INFO_ADD:
            return Object.assign({},state,action.payload);
        case INFO_EDIT:
            return Object.assign({},state,action.payload);
        case INFO_LIST:
            return Object.assign({},state,{
                infoList:action.payload.dataSource,
                total:action.payload.total,
            });

        default:
            return state
    }
};