import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    let link = <NavigationItem link="/auth" >  Authentication </NavigationItem>
    if (props.isAuth) {
        link = <NavigationItem link="/logout" >  Logout </NavigationItem>
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact> Burger Builder </NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders" > My Orders </NavigationItem> : null}
            {link}
        </ul>

    )

}


export default navigationItems;