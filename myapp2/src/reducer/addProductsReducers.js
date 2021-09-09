import {  PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL } from "../constants/productConstants";

function productSaveReducer(state = {product: []}, action){
    switch(action.type){
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return {loading: false, success: true,  product:action.payload};
        case PRODUCT_SAVE_FAIL:
            return {loading: true, error: action.payload};
        default:
            return state;
    }
}



function productDeleteReducer(state = {product: []}, action){
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true,  product:action.payload};
        case PRODUCT_DELETE_FAIL:
            return {loading: true, error: action.payload};
        default:
            return state;
    }
}



export { productSaveReducer, productDeleteReducer}

