import { REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        AUTH_ERROR,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT
    } from "../actions/types";     

const initialState = {  
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    isAuthentication: null,
    loading: true,
    user: null,
    twoFA:null
}


export default function(state = initialState, action){
    const { type, payload } = action;
        switch(type) { 
            case USER_LOADED:
                // localStorage.setItem('token', payload.token);
                return{
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: payload,
                    // twoFA: payload.payload.twoFA
                }
            
            case REGISTER_SUCCESS:
                return{
                    ...state,
                    ...payload,
                    loading: false,
                }

            case LOGIN_SUCCESS:
                localStorage.setItem('token', payload.token);
                localStorage.setItem('email', payload.payload.user.email);
                // console.log(payload.payload.twoFA);
                return{
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false,
                    twoFA: payload.payload.twoFA
                }

                case REGISTER_FAIL:
                case AUTH_ERROR:
                case LOGIN_FAIL:
                case LOGOUT:
                    localStorage.removeItem('token');
                    return{
                        ...state,
                        token: null,
                        isAuthenticated: false,
                        loading: false,
                    }
                default: 
                return state;
        }
}