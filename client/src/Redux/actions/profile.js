import axios from 'axios';

import { 
    GET_PROFILE,
    PROFILE_ERROR
 } from './types';    
 
 
 //Get current users profile
 export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        // console.log(res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
};


/// Create and update profile
export const createProfile = (FormData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', FormData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        // dispatch(alert(edit ? 'Profile Updated' : 'Profile Created'));
        alert(edit ? 'Profile Updated' : 'Profile Created')

        if (!edit) {
            history.push('/profile');
        }
    } catch (err) {
        // const errors = err.response.data.errors;
        //  alert(errors[0].msg);
        // if (errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}




///Security Information update
export const updateSecurity = (securityData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(securityData);
        const res = await axios.post('/api/profile/edit-password', securityData, config);
        console.log(res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        // alert(edit ? 'Security Information Updated' : 'Security Information Created');
       if(res.data){
           alert('Security Information Updated');
       }else{
        alert(res.data.errors[0].msg);
       }

        if (!edit) {
            history.push('/profile');
        }
    } catch (err) {
        const errors = err.response.data.errors;
         alert(errors[0].msg);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}