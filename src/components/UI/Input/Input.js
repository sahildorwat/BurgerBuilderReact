import React from 'react'
import classes from './Input.css'

const input = (props) => {
    let inputElement = null;
    // console.log('props in input : ', props)
    const inputClasses = [classes.Input]
    if(props.isInvalid && props.shouldValidated && props.touched){
        // console.log('invalid element')
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType){
        case 'input' :
            inputElement = <input className= {inputClasses.join(' ')} 
                                 {...props.elementConfig}
                                 onChange = {props.changed}
                                 autoComplete= "name" />//{props.elementConfig.placeholder} />
            break;
        case 'textarea'  :
            inputElement = <textarea className= {inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                onChange = {props.changed}
                                autoComplete= "name" />//{props.elementConfig.placeholder}/>
            break;
        
        case 'select'  :
            inputElement = (
                <select className= {inputClasses.join(' ')}
                        onChange = {props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key = {option.value} value={option.value}  > {option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        
            default:
        inputElement = <input className= {inputClasses.join(' ')} {...props} 
                              autoComplete= "name"/>
    }


    return(
        <div className={classes.Input}>
            <label> {props.label} </label>
            {inputElement}
        </div>
    );
}

export default input;