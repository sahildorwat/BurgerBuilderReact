import * as actionType from '../../store/actions/index'
import {updateObject} from './utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return updateObject(state, { purchased: false })
        case actionType.PURCHAE_BURGER_SUCCESS:
            const newOrder = { ...action.orderData, id: action.orderId }
            return updateObject(state, { loading: false, orders: state.orders.concat(newOrder), purchased: true })
        case actionType.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false, purchased: true })
        case actionType.PURCHASE_LOADING:
            return updateObject(state, { loading: true })
        case actionType.ORDERS_LOAD:
            return updateObject(state, { orders: action.orders, loading: action.loading })
        default:
            return state
    }
}

export default orderReducer;