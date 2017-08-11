const defaultState = {
    isLoggedIn: false,
    username: '',
    password: ''
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action.username,
                password: action.password
            })
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: false,
                username: '',
                password: ''
            })
        default:
            return state
    }
}

export default reducer