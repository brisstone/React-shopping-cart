import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer } from './reducer/productReducers';
import {cartReducer} from './reducer/cartReducers';
import {userSigninReducer, userRegisterReducer} from './reducer/userReducers';
import { productSaveReducer, productDeleteReducer } from './reducer/addProductsReducers';

// create cookie to temporarily store cart items
const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

// set initial state of cart reducer to previous state to always store the items even if the browser is refreshed
// then apply in cartAction.js
const initialState = { cart: {cartItems}, userSignIn: {userInfo}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSigninReducer,
    userRegister: userRegisterReducer, 
    productSave: productSaveReducer,
    productDelete: productDeleteReducer 
})

// Enable chrome extension and make the store visible  
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// THUNK is a redux middleware that allows us to run async operation in action reducer
// npm install redux-thunk
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;