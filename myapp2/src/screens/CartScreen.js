import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';





function CartScreen(props){
    //retirieve the cart redux from store
    const cart = useSelector(state => state.cart);
    //destructure cart to get the cartitems defined in the cartReducer
    const { cartItems } = cart;

    console.log(cartItems.price)

    const productId = props.match.params.id;
    // search for the qty in the query sent from ProductScreen.js
    // check if it exists, split it and choose the second value, which is the quantity 
    const qty = props.location.search? Number(props.location.search.split('=')[1]): 1;
    console.log(typeof qty);
    console.log(productId);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

      const removeFromCartHandler = (productId) =>{
            dispatch(removeFromCart(productId));
      }

      const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
      }

    return <div className="cart"> 
        <div className="cart-list">
            
            <ul className="cart-list-container"> 
                <li> 
                    <h3>
                        Shopping Cart
                    </h3>
                    <div className="price">
                        price
                    </div>
                </li>
                {
                    cartItems.length === 0? 
                    <div className="">
                        cart is empty
                    </div>
                    :
                    cartItems.map(item =>
                        <li className="cart-image">
                            <div className="">
                                 <img src={item.image} alt="product"></img>
                            </div>
                            
                            <div className="cart-name">
                                <div>
                                    <Link to = {"/product/" + item.product}>{item.name}</Link>
                                   
                                </div>
                                <div> 
                                    Qty:
                                    <select value={item.qty} onChange= { (e)=> { dispatch(addToCart(item.product, e.target.value)) }}>
                                        { 
                                        [...Array(item.countInStock).keys()].map(x=>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                    </select>
                                    <button type='button' className="button " onClick={() =>removeFromCartHandler(item.product)}>
                                        delete
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                    {item.price}
                            </div>
                        </li>
                       
                    )
                    
                }
            </ul>
        </div>
        <div className="cart-action">
                <h3> 
                    subtotal: ({cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0)} items)
                    :
                    $ {cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.qty, 0)}
                </h3>
                <button  onClick={checkoutHandler} className= "button primary full-width" disabled = {cartItems.length === 0}> 
                Proceed to check out
                </button>
        </div>
    </div>
}

export default CartScreen;