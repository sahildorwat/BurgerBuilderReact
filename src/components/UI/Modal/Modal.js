import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';

const modal = (props) => {
    // console.log('value of show in modal.js is  :', props.show);
    return  <Aux> 
                <BackDrop show= { props.show} back = { props.back} />
                <div className={ classes.Modal}
                    style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? '1':0          
                    }}    >
                    {props.children}
                    
                 </div>
            </Aux>
}
        

export default modal;