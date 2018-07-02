import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    // console.log('price in OrderSummary is :' , props.price);
    const ingredients = Object.keys(props.ingredients)
                        .map( igkey => (
                                <li  key= {igkey}>
                                    <span style = {{textTransform: 'capitalize'}}> { igkey} </span> : {props.ingredients[igkey] } 
                                </li>
                        )
                        );
    
    return (
        <Aux>
        <h3> The delitious burger ingredients are as follows : </h3>
        {ingredients}
        <p> <strong> the total price is : {props.price.toFixed(2)} </strong></p>
        <h6> Continue to checkout ? </h6>
        <Button btntype = "Danger" clicked = {props.back}>Cancel </Button>
        <Button btntype = "Success" clicked = {props.continue} > Continue </Button> 
        </Aux>
    );
};

export default orderSummary;