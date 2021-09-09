import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import Homescreen from './screens/HomeScreen';
import Productscreen from './screens/ProductScreen';
import Cartscreen from './screens/CartScreen'
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';

import { useSelector } from 'react-redux';

import AddProductsScreen from './screens/AddProductsScreen';


function App() {
    const userSignin = useSelector(state => state.userSignIn);
    
   
    const {loading, userInfo, error} = userSignin;

      function openMenu(){
        document.querySelector('.sidebar').classList.add('open')
    }
    function closeMenu(){
        document.querySelector('.sidebar').classList.remove('open')
    }
  return (
    <BrowserRouter> 
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Brisstone Store</Link>
              
            </div>
            <div className="header-links">
                <Link to="/cart">Cart</Link>
                {
                    userInfo ?  <Link to="/profile">{userInfo.name}</Link>:
                     <Link to="/signin">Sign in</Link>
                }
               
               
            </div>
        </header>
        <aside className="sidebar">
           <h3>Shopping Categories</h3> 
            <button className="sidebar-close-button" onClick={closeMenu}> X </button>
           <ul>
               <li>
                   <a href="index.html">Pants</a>
               </li>

               <li>
                <a href="index.html ">Shirts</a>
            </li>
           </ul>
        </aside>
        <main className="main">
            <div className="content">
            <Route path='/addproducts' component = {AddProductsScreen}/> 
            <Route path='/register' component = {RegisterScreen}/>
            <Route path='/signin' component = {SignInScreen}/>
              <Route path='/products/:id' component = {Productscreen}/>
              <Route path='/cart/:id?' component = {Cartscreen}/>
                <Route path='/' exact={true} component = {Homescreen}/>
                
            </div>
            
        </main>
        <footer className="footer">
            all right reserved
        </footer>
    </div>
 </BrowserRouter> 
  );
}

export default App;
