import * as actionType from '../actions/actionTypes';
import { updatedObject } from '../utility';

const intialize = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}


const authStart = (state, action) => {
    return updatedObject(state, {error: null, loading: true})
}
const authSuccess = (state, action) => {
    return updatedObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    })
}

const reducer = (state = intialize, action) => {
    switch(action.type) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        default: return state
    }
}

export default reducer