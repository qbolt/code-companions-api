import axios from "axios";

export const login = (username, password) => (dispatch) =>{
    dispatch({type: 'LOGIN',
    username: username,
    password: password});
    axios.post('http://localhost:8080/api/users/login', {username:username, password:password})
        .then(res=>{
            if(res.data.success){
                dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            }else {
                dispatch({type: "LOGIN_ERROR", payload: res.data})
            }
        }).catch(err=>{
            dispatch({type: "LOGIN_ERROR", payload: err})
        })
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const signup = (username, password) => (dispatch) => { /*TODO*/ }