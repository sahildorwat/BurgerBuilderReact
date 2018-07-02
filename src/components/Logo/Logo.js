import React from 'react';
import logoImage from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props ) => (
    <div className= {classes.Logo}>
        <img src={logoImage} alt= "myLogo"/>
    </div>
);


export default logo;