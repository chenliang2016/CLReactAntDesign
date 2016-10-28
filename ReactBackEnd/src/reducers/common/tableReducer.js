/**
 * Created by cl on 2016/10/20.
 */
import {
    TABLE_LOADING,TABLE_NORMAL,TABLE_DATASOURCE
} from '../../actions/common/commonActionType'

const initState = {
    payload:{
        loading:false,
        dataSource:[],
        total:0,
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case TABLE_LOADING:
            return Object.assign({},state,action.payload);
        case TABLE_NORMAL:
            return Object.assign({},state,action.payload);
        case TABLE_DATASOURCE:
            return Object.assign({},state,action.payload);
        default:
            return state
    }
};