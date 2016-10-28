/**
 * Created by cl on 2016/10/19.
 */

import {combineReducers ,createStore,applyMiddleware} from 'redux'
import {routerReducer,routerMiddleware } from 'react-router-redux'

//通用
import table from "../reducers/common/tableReducer";
import form from "../reducers/common/formReducer";

//框架相关
import login from "../reducers/loginReducer";
import user from "../reducers/userReducer";
import menu from "../reducers/frameMenuReducer";
import role from "../reducers/frameRoleReducer";

//业务相关
import info from "../reducers/infoReducer";
import infoc from "../reducers/infoCReducer";

import {hashHistory} from 'react-router';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    form,
    table,
    login,
    user,
    menu,
    role,
    info,
    infoc,
    routing: routerReducer
});

const routermiddleware = routerMiddleware(hashHistory)

const middleware = [ thunk,routermiddleware ]

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;