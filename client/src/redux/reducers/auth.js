const defaultState = {
    isLoggedIn: false,
    loggingIn: false,
    username: '',
    data: null,
    err: null
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                loggingIn: true,
                username: action.username,
            })
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                loggingIn: false,
                isLoggedIn: true,
                data: action.payload,
                err: null
            })
        case 'LOGIN_ERROR':
            return Object.assign({}, state, {
                loggingIn: false,
                isLoggedIn: false,
                err: action.payload
            })
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: false,
                username: '',
                data: null
            })
        default:
            return state
    }
}

export default reducer