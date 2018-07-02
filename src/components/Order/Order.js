import React from 'react'
import classes from './Order.css'
const order = (props) => {
    const ingredients=[];
    // console.log('in Order :', props.ingredients)
    for(let ingredientName in props.ingredients ){
        // console.log('ingredientName',ingredientName)
        ingredients.push({
            key : ingredientName,
            amount: props.ingredients[ingredientName] 
        })
    }

    // console.log(ingredients)
    const ingredient = ingredients.map(ig => 
            <span key={ig.key} style={{textTransform :'capitalize',
                                        display :'inline-block',
                                        margin: '0 8px',
                                        // width: '80%',
                                        padding:'10px 0px',
                                        // // boxAlign: 'center',
                                        border: '1px solid #eee'
                                }}> {ig.key}  ({ig.amount}) </span> 
    )
    return (
        <div className={classes.Order}>
            <p>Order Ingredieents are : {ingredient}</p>
            
            <p>Order price is : <strong> usd {props.price }</strong> </p>
        </div>
    )
}

export default order;