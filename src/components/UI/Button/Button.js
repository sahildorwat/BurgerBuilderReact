import React from 'react';
import classes from './Button.css'
const button = ( props ) => {
    const className = [classes.Button, classes[props.btntype]]
    // console.log('in button ',{...props})
    return(
        <button  className = {className.join(' ')}
        onClick= {props.clicked} 
        {...props} > {props.children} </button> //{...props} 
    )
}
export default button;