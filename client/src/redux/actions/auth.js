import axios from 'axios';

import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    INVALID_CREDENTIALS
} from './types';

const API_URL = 'http://localhost:8080/api/users';

export const errorHandler = (dispatch, error, type) => {
    if (error.status === 401) {
        dispatch({
            type: type,
            payload: 'You are not authorized to do this. Please login and try again.'
        });
        logout();
    } else {
        dispatch({
            type,
            payload: error
        });
    }
}

export const login = (username, password, history) => {
    return (dispatch) => {
        axios.post(API_URL + '/login', { username, password })
            .then(({ data }) => {
                if (data.success) {
                    dispatch({ type: AUTH_USER })
                    history.push('/home')
                } else {
                    dispatch({ type: INVALID_CREDENTIALS })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export const logout = (history) => {
    return (dispatch) => {
        dispatch({ type: UNAUTH_USER })
        history.push('/login')
    }
}

export const signup = (username, password) => {

}
