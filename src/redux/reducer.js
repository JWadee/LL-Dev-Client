import {combineReducers} from "redux";
import userReducer  from './userReducer';
import contestReducer from './contestReducer';
import applicationReducer from './applicationReducer';

const reducers = combineReducers({
    user: userReducer,
    contest: contestReducer,
    application: applicationReducer
})

export default reducers;