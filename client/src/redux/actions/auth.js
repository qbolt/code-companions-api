import axios from 'axios';

import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER
} from './types';

const API_URL = 'http://localhost:8080/api';

export const errorHandler = (dispatch, error, type) => {
    let errorMessage = '';

    if (error.data.error) {
        errorMessage = error.data.error;
    } else if (error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    console.log(errorMessage)
    if (error.status === 401) {
        dispatch({
            type: type,
            payload: 'You are not authorized to do this. Please login and try again.'
        });
        logout();
    } else {
        dispatch({
            type,
            payload: errorMessage
        });
    }
}

export const login = (username, password) => {
    console.log('entering action')
    return (dispatch) => {
        console.log('calling post')
        axios.post(API_URL + '/login', { username: username, password: password })
            .then(response => {
                console.log('GOT RESPONSE')
                dispatch({ type: AUTH_USER })
                // window.location.href = CLIENT_ROOT_URL + '/dashboard';
            })
            .catch(error => {
                console.log(error)
                //
            });
    }
}

export function logout() {
    return function(dispatch) {
        dispatch({ type: UNAUTH_USER });
        console.log('logging out')
        // window.location.href = CLIENT_ROOT_URL + '/login';
    }
}

export const signup = (username, password) => (dispatch) => { /*TODO*/
}