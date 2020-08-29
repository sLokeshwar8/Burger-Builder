import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    ingredients: null,
    totalBurger : 4,
    error: false
}


const INGREDIENT_PRICE = {
    salad : 0.5,
    meat : 0.4,
    cheese : 0.7,
    bacon : 0.6 
}

const addIngredient = (state, action ) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] += 1}; // ES6 syntax [obj.property]:
    const updatedIngredients = {ingredients: { ...state.ingredients, updatedIngredient}};
    const updatedState = {
        ...state,
        updatedIngredients,
        totalBurger: state.totalBurger + INGREDIENT_PRICE[action.ingredientName]
    }
    return updatedObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] -= 1}; // ES6 syntax [obj.property]:
    const updatedIngredients = {ingredients: { ...state.ingredients, updatedIngredient}};
    const updatedState = {
        ...state,
        updatedIngredients,
        totalBurger: state.totalBurger + INGREDIENT_PRICE[action.ingredientName]
    }
    return updatedObject(state, updatedState)
}

const setIngredient = (state, action) => {
    return updatedObject(state,
        {
            ingredients: {
                salad: action.ingredient.salad,
                bacon: action.ingredient.bacon,
                cheese: action.ingredient.cheese,
                meat: action.ingredient.meat
            },
            totalBurger: 4, 
            error: false
        })
}

const fetchIngredient = (state, action) => {
    return updatedObject(state,{error: true})
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action)
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredient(state, action)
        default: return state

    }
    
}

export default reducer