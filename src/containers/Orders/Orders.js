import React, { Component } from 'react';
import Order from '../../components/Order/Order'
// import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionType from '../../store/actions/index'
import {connect } from 'react-redux'


class Orders extends Component {
    // state = { 
    //     orders: null,
    //     price: 0,
    //     loading: true
    // }
    componentDidMount = () => {
        this.props.ordersLoad(this.props.token, this.props.userId);
        // axios.get('/orders.json')
        //     .then(response => {
        //         const fetchOrders = []
        //         // console.log('  response ', response.data);
        //         for (let key in response.data) {
        //             // console.log('key is : ', response.data[key])
        //             fetchOrders.push({ ...response.data[key], id: key })
        //         }
        //         this.setState({ orders: fetchOrders, loading: false })
        //     })
        // .catch()
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(ele => {
                // console.log('hre ingredients are:' , ele.ingredients)
                return (
                    <Order key={ele.id}
                        ingredients={ele.ingredients}
                        price={ele.price} />
                )
            }
            )
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token : state.auth.idToken,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        ordersLoad : (token,userId) => dispatch( actionType.loadOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);