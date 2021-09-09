import { PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants/productConstants";
import axios from 'axios';





const saveProduct = (id, name, price, image, brand, category, description, countInStock, product) => async (dispatch, getState) => {
    try{
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: {id, name, price, image, brand, category, description, countInStock}});
        // get the token from user signin reducer
        const { userSignIn: { userInfo } } = getState(); 
        

        // to take care of create and update button 
        // since the id of the product is only set on the home screen when the edit button is clickes
        if(!id){
            const {data} = await axios.post('/api/products', {id, name, price, image, brand, category, description, countInStock}  , 
                {headers: {
                    "Authorization" : "Bearer" + userInfo.token
                }
            
            }); 
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        } else{
            const {data} = await axios.put('/api/products/' + id, {id, name, price, image, brand, category, description, countInStock}  , 
                {headers: {
                    "Authorization" : "Bearer" + userInfo.token
                }
            }); 
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }
        

      

      
    }
    catch(error){
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message})
    }

}

const deleteProduct = (id) => async (dispatch, getState) => {
    try{
         const { userSignIn: { userInfo } } = getState(); 

        dispatch({type: PRODUCT_DELETE_REQUEST, payload: id})
        const {data} = await axios.delete(`/api/products/${id}`); 

        // {
        //     headers: {
        //         Authorization : "Bearer" + userInfo.token
        //     }
        // }

        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true})
    }
    catch(error){
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error})
    }

}

export {saveProduct, deleteProduct};