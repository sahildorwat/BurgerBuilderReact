import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredients = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName 
    }
}
export const removeIngredients = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName 
    }
}

export const setIngredients = (ingredients) => {
    console.log('set ingredients')
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data) )
        } ).catch(error => {
            dispatch(fetchIngredientFailed())
        })
    }
}