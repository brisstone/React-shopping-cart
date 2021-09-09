import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { saveProduct, deleteProduct } from '../actions/AddProductsActions';
import { listProducts } from '../actions/productActions';


function AddProductsScreen(props){
    //to control the product form visibility
    const [addProductFormVisibility, setAddProductFormVisibility] = useState(false)
    
    const [id, setId] = useState('');
    const [name, setName] = useState(''); 
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');

    
    const productList = useSelector(state => state.productList);
    const {products, loading , error} = productList;
    
    const productSave = useSelector(state=> state.productSave)
    const {success: successSave, loading: loadingSave, error : errorSave} = productSave;

    const productDelete = useSelector(state=> state.productDelete)
    const {success: successDelete, loading: loadingDelete, error : errorDelete} = productDelete;

    const dispatch = useDispatch();


    useEffect(()=>{
        // TO disable the form upon UPDATE OF PRODUCT
        if(successSave){
            setAddProductFormVisibility(false);
        }
        //enable runing of homepage url after loading of this url(after adding an item)
        // to get the listproducts reducers
        dispatch(listProducts())
    }, [successSave])

    const openProductForm = (product) =>{
        setAddProductFormVisibility(true); // used tp display the product form
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setCategory(product.category);
    

    }

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveProduct( id, name, price, image, brand, category, description, countInStock));
    }

    const deleteHandler = (product)=>{
      
        dispatch(deleteProduct(product._id));
    }
   
   
    return <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            {!addProductFormVisibility && 
            <button className="button primary" onClick= {()=>openProductForm({})} > Create Product </button>
            }
            
            {addProductFormVisibility && 
            <button onClick= {()=>setAddProductFormVisibility(false)} > Back </button>
            }
        </div>

        {/* display form only when addProductFormVisibility is true */}
        {addProductFormVisibility && 

            <div className="form"> 
            <form onSubmit={submitHandler}>
                <ul className="form-container"> 
                    <li> <h3>create product</h3> </li>
                    <li> 
                        {loadingSave && <div> loading------</div> }
                        {errorSave && <div>{errorSave}</div> }
                    </li>
                    <li>
                        <label htmlFor="name">
                            name
                        </label>
                        <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}> 
                        </input>
                    </li>
                    <li>
                        <label htmlFor="price">
                            price
                        </label>
                        <input type="text" name="price" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}> 
                        </input>
                    </li>
                    <li>
                        <label htmlFor="category">
                            category
                        </label>
                        <input type="text" name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}> 
                        </input>
                    </li>
                    <li>
                        <label htmlFor="image">
                            image
                        </label>
                        <input type="text" name="image" id="image" value={image} onChange={(e)=>setImage(e.target.value)}> 
                        </input>
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                            countInStock
                        </label>
                        <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}> 
                        </input>
                    </li>
                    <li>
                        <label htmlFor="description">
                            description
                        </label>
                        <input type="text" name="description" id= "description" value={description} onChange={(e)=>setDescription(e.target.value)}> 
                        </input>
                    </li>
                
                    <li>
                        <label htmlFor="brand">
                            brand
                        </label>
                        <input type="text" name="brand" id="brand" value={brand} onChange={(e)=>setBrand(e.target.value)}> 
                        </input>
                    </li>
                    
                    <li>
                    <button type="submit" className="button primary">{id? "UPDATE": "Create" }</button>
                    </li>

                    <li>
                    <button type="submit" className="button secondary" onClick= {()=>setAddProductFormVisibility(false)}>Back</button>
                    </li>
                </ul>
            </form>
            </div>
        }
        


        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {console.log(products)}
                    {
                        products.map(product=> 
                            <tr key={product._id}>
                                <td>h</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button className="button" onClick= {()=>openProductForm(product)} >Edit</button>
                                    <button className="button"  onClick= {()=> deleteHandler(product)}  > Delete</button>
                                </td>
                            </tr>
                        )
                    }
                   
                </tbody>
            </table>
        </div>


    </div>
    
   
} 

export default AddProductsScreen;  