/**
 * Created by cl on 2016/10/27.
 */
import {
    INFOC_LIST
} from '../actions/actionType'

const initState = {
    formData:{},
    infoCList:[],
    total:0,
}

export default (state=initState, action) => {
    switch (action.type) {
        case INFOC_LIST:
            return Object.assign({},state,{
                infoCList:action.payload.dataSource,
                total:action.payload.total,
            });

        default:
            return state
    }
};