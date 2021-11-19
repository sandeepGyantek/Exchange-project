import axios from 'axios';
import { Redirect } from 'react-router';
import setAuthToken from '../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
        // console.log(res.data);
        
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};


//Register user
export const register =
  ({ fullName, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ fullName, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      alert(res.data.msg);

      dispatch(loadUser());
    } catch (err) {
        if(err){
            const errors = err.response.data.errors;
            alert(errors[0].msg);
        }
      
      // if(errors){
      //     errors.forEach(error => dispatch(alert(error.msg)));
      // }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };



//Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);
        // console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
        
    } catch (err) {
        const errors = err.response.data.errors;
        alert(errors[0].msg);
        // if(errors){
        //     errors.forEach(error => dispatch(alert(error.msg)));
        //     return <Redirect to="/login" />
        // }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}


// Logout clear profile

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    // dispatch({ type: CLEAR_PROFILE });
  };