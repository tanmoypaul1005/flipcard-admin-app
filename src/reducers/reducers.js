import { combineReducers } from "redux";
import authReducers from "./authReducers";
import userReducer from "./userReducers";
import categoryReducer from "./categoryReducers";
import orderReducers from "./orderReducers";
import productsReducers from "./productsReducers"
import pageReducers from "./pageReducers"

const reducer=combineReducers({
    auth:authReducers,
    user:userReducer,
    category:categoryReducer,
    order:orderReducers,
    product:productsReducers,
    page:pageReducers
})
export default reducer;