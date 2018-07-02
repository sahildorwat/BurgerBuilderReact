import * as actionTypes from './index'
import axios from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHAE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseLoading =() =>{
    return {
        type: actionTypes.PURCHASE_LOADING
    }
}
export const purchaseBurgerStart = (orderData, token) => {
    // console.log('in order action ', orderData)
    return dispatch => {
        dispatch(purchaseLoading())
        
        axios.post('/orders.json?auth='+token, orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }).catch(error => {
            // this.setState({ loading: false })
            console.log(error)
            dispatch(purchaseBurgerFail(error))
        });
    }
}

export const loadOrderHelper =( orders) => {
    return {
        type: actionTypes.ORDERS_LOAD,
        orders: orders,
        loading: false
    }
}

export const loadOrders = (token, userId)=>{
    return dispatch => {
        console.log(userId)
        const auth = '?auth='+token + '&orderBy="userId"&equalTo="'+ userId+'"';
        axios.get('/orders.json'+auth)
        .then(response => {
            const fetchOrders = []
            for (let key in response.data) {
                fetchOrders.push({ ...response.data[key], id: key })
            }
            dispatch(loadOrderHelper(fetchOrders))
        })
    .catch(error => console.log(error)
    )
    }
}

export const onPurchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}