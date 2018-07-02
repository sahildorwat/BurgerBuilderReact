import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
   let sideDrawerClass = [classes.SideDrawer, classes.Close];
    if(props.sideDrawerClosed)
        sideDrawerClass = [classes.SideDrawer, classes.Open];
    return (
        <div className= { sideDrawerClass.join(' ') }
                onClick = {props.closeSideDrawer} > 
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
        </div>
    );

}

export default sideDrawer;