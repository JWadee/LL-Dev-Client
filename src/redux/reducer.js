import {combineReducers} from "redux";
import userReducer  from './userReducer';
import contestReducer from './contestReducer';

const reducers = combineReducers({
    user: userReducer,
    contest: contestReducer
})

export default reducers;