import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";


import productReducer from "./product";
import storeReducer from "./store";
import {AppNavigator} from "../containers/AppNavigator";


const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
    productState: productReducer,
    storeState: storeReducer,
    navState: navReducer
})

export default rootReducer;