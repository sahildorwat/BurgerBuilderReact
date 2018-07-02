import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Cheese' , type : 'cheese'},
    {label : 'Meat' , type : 'meat'},
    {label : 'Bacon' , type : 'bacon'},
    {label : 'Salad' , type : 'salad'}
]

const buildControls = ( props ) => 
    <div className={ classes.BuildControls } > 
    <h4>Current price of burger is  : {props.currentPrice.toFixed(2)} </h4>
     { controls.map((ele) => (
               <BuildControl key={ele.label} 
                             label = {ele.label} 
                             more = {() =>props.addIngredient(ele.type)}
                             less = {() =>props.removeIngredient(ele.type)}
                             disabledInfo = {props.disabledInfo[ele.type]}
                             />
     ))}
 
     <button className={classes.OrderButton} 
                onClick= {props.show}
                disabled = {!props.purchasable}> ORDER NOW</button>
    </div>
    ;

export default buildControls;