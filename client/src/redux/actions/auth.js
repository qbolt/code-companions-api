export const login = (username, password) => ({
    type: 'LOGIN',
    username: username,
    password: password
})

export const logout = () => ({
    type: 'LOGOUT'
})

export const signup = (username, password) => (dispatch) => { /*TODO*/ }