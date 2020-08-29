import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const authSucess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const auth = ( email, password, isSignup) => {
    return dispatch => {
        dispatch( authStart() )
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        //sign up new user 
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHj3eM_a70z2bCAcTD91k3S9SPEqL2g4w';
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHj3eM_a70z2bCAcTD91k3S9SPEqL2g4w';
        }
        axios.post(url, authData)
        .then(respone => {
            console.log(respone)
            dispatch( authSucess(respone.data.idToken, respone.data.userId) )
        } )
        .catch( err => {
            dispatch( authFail(err.response.data.error))
        } )
    }
}

