import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { signin } from '../actions/userActions';


function SignInScreen(props){
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    //access user from redux store

    const userSignIn = useSelector(state=> state.userSignIn)
    const {userInfo, loading, error} = userSignIn;

    const dispatch = useDispatch();


    useEffect(()=>{
        //if user data is successfully retrieved from the database
        if(userInfo){
            props.history.push('/')
        }
                // userinfo inside array means if userinfo changes useEffect will rerender
    }, [userInfo])


    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(signin(email, password));
    }
   
   
    return <div className="form"> 
        <form onSubmit={submitHandler}>
            <ul className="form-container"> 
                <li> <h3>Signin</h3> </li>
                <li> 
                    {loading && <div> loading------</div> }
                    {error && <div>{error}</div> }
                 </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <label htmlFor="password">
                        password
                    </label>
                    <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <button type="submit">Signin</button>
                </li>
                <li>New to Brisstore?</li>
                <li>
                    <Link to="/register" className="button secondary text-center "> Create Account</Link>
                </li>
            </ul>
        </form>
    </div>
} 

export default SignInScreen;  