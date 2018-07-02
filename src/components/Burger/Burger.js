import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    let ingredient = Object.keys(props.ingredients).map( igkey => {
        
        return [...Array(props.ingredients[igkey])]
                .map( (_, index)=> 
                    // console.log(igkey,index);
                    <BurgerIngredient key= {igkey + index} type={igkey} />   
            );
    }).reduce((arr, ele) => arr.concat(ele),[]);
    if(ingredient.length === 0 ){
        ingredient = <p> Please start adding Ingredients !!</p>
    }    
    // console.log(ingredient);
    return (
        <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {ingredient}
        <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;