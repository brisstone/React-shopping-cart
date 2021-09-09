import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';


import {listProducts} from '../actions/productActions'


function HomeScreen(props){

    //retrieve the state created with redux
    //it takes state and returns the reducer(productList) defined in productReducers.js but imported into
    //redux store(store.js) as productList
    const productList = useSelector(state => state.productList);

    //destructure productlist reducer
    const {products, loading , error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
      //DISPATCH THE ACTION 'listProducts'
      dispatch(listProducts());
        
  
    }, [dispatch])
    
    return loading ? <div> loading----</div>:
      error ? <div>{error}</div>:

    <ul className="products">

    {
      products.map(product=>
          <li key={product._id}> 
            <div className="product">
            <Link to={"/products/" + product._id}>
            <img className="product-image" src={product.image} alt="product"></img>
            </Link>
                
                <div className="product-name">
                    <Link to={"/products/" + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars({product.numReviews} reviews)</div>
            </div>
        </li>
      )
    }
    
   
   
   
</ul>
}
export default HomeScreen; 