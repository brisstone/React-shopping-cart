import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { register } from '../actions/userActions';


function RegisterScreen(props){
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    //access user from redux store

    const userRegister = useSelector(state=> state.userRegister)
    const {userInfo, loading, error} = userRegister;

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
        dispatch(register(name, email, password));
    }
   
   
    return <div className="form"> 
        <form onSubmit={submitHandler}>
            <ul className="form-container"> 
                <li> <h3>Register</h3> </li>
                <li> 
                    {loading && <div> loading------</div> }
                    {error && <div>{error}</div> }
                 </li>
                 <li>
                    <label htmlFor="name">
                        name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)}> 
                    </input>
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
                    <label htmlFor="rePassword">
                        rePassword
                    </label>
                    <input type="rePassword" name="rePassword" id="rePassword" onChange={(e)=>setRePassword(e.target.value)}> 
                    </input>
                </li>
                <li>
                    <button type="submit">Register</button>
                </li>
                <li>Already a member?</li>
                <li>
                    <Link to="/signin" className="button secondary text-center ">Sign In</Link>
                </li>
            </ul>
        </form>
    </div>
} 

export default RegisterScreen;  