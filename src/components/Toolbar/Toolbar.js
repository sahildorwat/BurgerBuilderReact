import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className = {classes.Toolbar} >
        <DrawerToggle clicked = {props.click} />
        <Logo />        
        <nav className={ classes.DeskTopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>    
    </header>
);

export default toolbar;