import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => (
    <div className={classes.NavigationItem}>
        <NavLink to={props.link}
                    exact = {props.exact}
                 activeClassName={classes.active}> {props.children} </NavLink>
    </div>
);

export default navigationItem;