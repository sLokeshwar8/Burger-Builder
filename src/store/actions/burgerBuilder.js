import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-order';


export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredient = (ingredient) => {
    return  {
        type: actionTypes.SET_INGREDIENT,
        ingredient: ingredient
    }
}

export const fetchingredientfailed = () => {
    return  {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://burger-builder-ac7f3.firebaseio.com/ingredients.json')
        .then(res => {
           dispatch(setIngredient(res.data))
        }).catch(error => {
            dispatch(fetchingredientfailed())
        })
    }
}
