import axios from 'axios';
import Cookie from 'js-cookie'
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNIN_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST } from '../constants/userConstants';


const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try{
        // make an axios request to the backend api along with the data you want to send(email and password)
        const {data} = await axios.post("/api/users/signin", {email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        Cookie.set('userinfo', JSON.stringify(data))
    } catch(error){
        console.log("Erjjjjjjjjjoor", error)
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message})
     
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}});
    try{
        // make an axios request to the backend api along with the data you want to send(email and password)
        const {data} = await axios.post("/api/users/register", {name, email, password})
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        Cookie.set('userinfo', JSON.stringify(data)) 
    } catch(error){
        console.log("Erjjjjjjjjjoor", error)
        dispatch({type: USER_REGISTER_FAIL, payload: error.message})
     
    }
}

export {signin, register}