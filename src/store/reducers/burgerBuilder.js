import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './utility';

const initialize = {
    ingredients: null,
    price: 4,
    error: false,
    building: false
}
const ingredientPrice = {
    cheese: 0.4,
    salad: 0.6,
    bacon: 0.7,
    meat: 1.2
}
const reducer = (state = initialize, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return updateObject(state, {
                ingredients: { ...state.ingredients,[action.ingredientName]: state.ingredients[action.ingredientName] + 1 },
                price: state.price + ingredientPrice[action.ingredientName],
                building: true
            })
        case actionTypes.REMOVE_INGREDIENT:
            return updateObject(state, {
                ingredients: { ...state.ingredients,[action.ingredientName]: state.ingredients[action.ingredientName] - 1 },
                price: state.price - ingredientPrice[action.ingredientName]
            })
        case actionTypes.SET_INGREDIENT:
            return updateObject(state, { ingredients: { ...action.ingredients }, error: false, price: 4 })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true })
        default:
            return state;
    }

}

export default reducer;