import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner   from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
// import * as actionTypes from "../../store/actions/actionTypes";
// import classes from '../../components/UI/Modal/Modal.css';
import * as actions from '../../store/actions/index'
// import { Redirect} from 'react-router-dom'

class BurgerBuilder extends Component{
    
    state = {
        // ingredients: null,
        // price :4,
        // purchasable : false,
        purchasing : false,
        // loading: false.purchasing,
        // error: false
    }

    // componentDidMount = () => {
    //     // if(this.props.ingredients){
    //         console.log('in initialization')
    //         this.props.onInit()
    //     // }
    // }
    componentDidMount = () =>{
        // axios.get('/ingredients.json').then(response => {
        //     // console.log('in comp did mount data',response);
        //     if(response)
        //         this.setState({ingredients : response.data })
        // }).catch(error => {
        //     this.setState({error: true})
        //     // console.log('error in comp did mount ',error);
        // })
        // console.log('in initialization')
        this.props.onInit()
    }

    updatePurchasableState ( ingredients ){
        // console.log('in updatePurchasable state func' , ingredients)
        const sum = Object.keys(ingredients).map(
            (igkey) =>  ingredients[igkey]).reduce((total,currvalue) => total+currvalue , 0 );
        // console.log('current sum is : ' ,sum);
            return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     //  console.log(' price of cheese is :' , ingredientPrice['cheese']) ;
    //     const oldprice = this.state.price;
    //     const updatedIngredients =  {...this.state.ingredients };
    //     updatedIngredients[type] = this.state.ingredients[type] +1;
    //     const updatedPrice = oldprice + ingredientPrice[type]; 
    //     this.setState({ingredients : updatedIngredients ,
    //                     price : updatedPrice });
    //     this.updatePurchasableState(updatedIngredients);                

    // }

    // removeIngredientHandler = ( type ) => {
    //     const oldPrice = this.state.price;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = this.state.ingredients[type]-1;
    //     const updatedPrice = oldPrice - ingredientPrice[type];
    //     this.setState({ingredients : updatedIngredients ,
    //         price : updatedPrice });
    //     this.updatePurchasableState(updatedIngredients);    
    // }

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing : true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }

    }
    cancelPurchaseHandler = () => {
        console.log('backdrop were accessed !!');   
        this.setState({purchasing : false});
        
    }

    continuePurchaseHandler = () => {
        // console.log(this.props)
        // const queryParams= [];
        // for(let i in this.props.ings){ //this.state.ingredients
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]) )  //this.state.ingredients[i])
        // }
        // queryParams.push('price='+ this.props.price) //this.state.price)
        // const queryString = queryParams.join('&');
        // this.props.history.push({   pathname : '/checkout',
        //                             search : '?'+ queryString})

        let url = this.props.isAuth ? "/checkout" : "/auth"
        this.props.history.push(url);
    }
    render(){
        
            
        const disabledInfo = {...this.props.ings}; //{...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = this.props.error ? <p> the ingredients can't be loaded </p>:<Spinner />
        let burger = this.props.error ? <p> the ingredients can't be loaded </p>:<Spinner />

//        if(this.state.ingredients){
        if(this.props.ings){
            orderSummary =  <OrderSummary  ingredients =  {this.props.ings}  //{this.state.ingredients} 
                                            back = {this.cancelPurchaseHandler}
                                            continue = {this.continuePurchaseHandler}
                                            price =  {this.props.price}//{this.state.price}
                                            />

            burger = (<Aux>
                        <Burger ingredients= {this.props.ings} //   {this.state.ingredients}/>
                            />
                        <BuildControls addIngredient = {(ingName) => this.props.onAddIngredient(ingName)}//{this.addIngredientHandler} 
                                        removeIngredient =  {(ingName) => this.props.onRemoveIngredient(ingName)}//{this.removeIngredientHandler}
                                        disabledInfo = {disabledInfo}
                                        purchasable = {this.updatePurchasableState(this.props.ings)}
                                        show = {this.purchaseHandler}
                                        currentPrice = {this.props.price} //{this.state.price} 
                                                     /> 
                    </Aux>
                    )
        }

                
        // if (this.state.loading){
        //     orderSummary = this.state.error ? <p> the ingredients can't be loaded </p>:<Spinner />
        //     // console.log('loading');
        // }

        return (
            <Aux>
            <Modal show = {this.state.purchasing}
                    back = { this.cancelPurchaseHandler}
                    >
                {orderSummary}       
            </Modal>
            {burger}
           </Aux>
        );
    }
}
// export default BurgerBuilder;



const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.idToken != null
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        onAddIngredient : (ingName)=> dispatch(actions.addIngredients(ingName)),
        onRemoveIngredient : (ingName)=> dispatch(actions.removeIngredients(ingName)),
        onInit : ()=> dispatch(actions.initIngredients()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));