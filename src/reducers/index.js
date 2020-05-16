import { combineReducers } from "redux";
import LoginReducer from "./login_reducers";
import ProductReducer from "./mobiles_reducers";

const rootReducer = combineReducers({
    LoginReducer,
    ProductReducer
});

export default rootReducer;
