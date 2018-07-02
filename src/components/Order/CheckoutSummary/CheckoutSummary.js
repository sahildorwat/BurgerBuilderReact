import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className= {classes.CheckoutSummary}>
            <h1>We hope it tastes well </h1>
            <div style= {{textAlign:'center'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button btntype="Danger"
                    clicked = {props.cancelOrder}> CANCEL </Button>
            <Button btntype="Success"
                    clicked = {props.continueOrder}> CONTINUE </Button>
        </div>
    )
}

export default checkoutSummary;