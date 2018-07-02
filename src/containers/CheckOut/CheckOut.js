import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'; 
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class CheckOut extends Component{
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount= () => {
    //     // console.log(this.props)
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients={};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1]
    //         }else{
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     // console.log(ingredients)
    //     this.setState({ ingredients : ingredients,
    //                     price : price})
    // }

    cancelOrderHandler = () => {
        this.props.history.goBack();   
    }
    continueOrderHandler = () => {
        // console.log('continueOrderHandler ()',this.props )
        this.props.history.replace(this.props.match.url+'/contact-data');
    }
    render(){
        let checkoutSummary = null
        // if(this.state.ingredients){
        if(this.props.ings){
            // console.log('in here')
            checkoutSummary = <CheckoutSummary   ingredients =  {this.props.ings}//{this.state.ingredients} 
                                                clickecancelOrderd = {this.cancelOrderHandler}
                                                continueOrder = {this.continueOrderHandler}    /> 
        }
        return (
            <div>
                {checkoutSummary}
                <Route path={this.props.match.url + '/contact-data'}
                        component ={ContactData} /> 
                {/* render ={  (props) => <ContactData 
                                                ingredients = {this.state.ingredients}
                                                price = {this.state.price}
                                                {...props}/> } /> */}
            </div>
        ) 
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        
    }
}
export default connect(mapStateToProps)(CheckOut);