import { combineReducers } from "redux";
import LoginReducer from "./login_reducers";
import ProductReducer from "./products_reducers";
import ProductDetailsReducer from "./productDetails_reducers";
import CartReducer from "./cart_reducers";

const rootReducer = combineReducers({
    LoginReducer,
    ProductReducer,
    ProductDetailsReducer,
    CartReducer
});

export default rootReducer;
