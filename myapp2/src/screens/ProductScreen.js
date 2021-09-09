import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { detailsProduct } from '../actions/productActions'


function ProductScreen(props){

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);

    //DESTRUCTURE PRODUCTDETAILS REDUCER defined in store.js
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(()=>{
            dispatch(detailsProduct(props.match.params.id));
    }, [dispatch])
   
    // //retirieve the id('"/products/" + product._id}') props sent from homescreen
    // const product = data.products.find(x => x._id === props.match.params.id)  
   
    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + "?qty=" + qty)
    }

    console.log(product)
    return <div>

        <div>
            <Link to='/'> Back to result </Link>
        </div>

    {loading? <div>loading====</div>: 
        error? <div>error </div>:
        (
            <div className="details"> 
            <div className="details-image">
                <img src={product.image} alt = "product"></img>
            </div>
    
        
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li> 
                        {product.rating} Start ({product.numReview} Reviews)
                    </li>
                    <li>
                        {product.price}
                    </li>
                    <li>
                        Description
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action"> 
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.countInStock > 0? "In Stock": "out of stock"}
                    </li>
                    <li>
                        Qty: <select value={qty} onChange= { (e)=> { setQty(e.target.value) }}>
                               { 
                               [...Array(product.countInStock).keys()].map(x=>
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                )}
                        </select>
                    </li>
                    <li>
                        {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button>

                        }
                        
                    </li>
                </ul>
            </div>
        </div>

        )
    }
        
        
    </div>
}

export default ProductScreen;  