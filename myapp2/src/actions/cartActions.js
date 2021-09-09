import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
import cookie from 'js-cookie';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try{
        const {data} = await Axios.get("/api/products/" + productId) 
        console.log(data)
        dispatch({type: CART_ADD_ITEM, payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }})
        //enable cookie to temporarily store cartitems
        //so it doesnt clear upon refresh
        //get the cart items and save them in the cookie
        const {cart: { cartItems} } = getState();
        cookie.set("cartItems", JSON.stringify(cartItems));
    } catch(error){
            console.log("error", error)
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

        //enable cookie to temporarily store cartitems
         //so it doesnt clear upon refresh
    const {cart: { cartItems} } = getState();
    cookie.set("cartItems", JSON.stringify(cartItems));
}

export {addToCart, removeFromCart}