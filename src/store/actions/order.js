import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() )
        axios.post('/order.json', orderData)
        .then(response => { 
            console.log(response.data)
            dispatch( purchaseBurgerSuccess(response.data.name, orderData) )
        }).catch( error => {
            dispatch( purchaseBurgerFail(error) )
        });   
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

/** Order data  **/

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return  {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrder = (orders) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/order.json',orders)
        .then(response => {
            console.log(response.data)
            let featchedOrder = [];
            for( let key in response.data) {
                featchedOrder.push({
                    ...response.data[key],
                    id : key
                })
            }
            dispatch(fetchOrderSuccess(featchedOrder))
        }).catch(error => {
            dispatch(fetchOrderFail(error))
        })
    }
}