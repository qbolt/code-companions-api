import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    INVALID_CREDENTIALS
} from '../actions/types'

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false }

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            console.log('authed!')
            return { ...state, error: '', message: '', authenticated: true }
        case UNAUTH_USER:
            return { ...state, authenticated: false }
        case AUTH_ERROR:
            return { ...state, error: action.payload }
        case INVALID_CREDENTIALS:
            return { ...state, message: 'Incorrect username and/or password.' }
        default:
            return state
    }
}

export default reducer
