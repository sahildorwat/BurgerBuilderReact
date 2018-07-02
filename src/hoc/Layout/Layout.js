import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import BackDrop from '../../components/UI/BackDrop/BackDrop';
import { connect} from 'react-redux'


class Layout extends Component{
    state = {
        sideDrawerClosed : true
    }

    closeSideDrawerHandler = () => {
        console.log('in closeSideDrawerHandler () ');
        this.setState({sideDrawerClosed : true});
    }
    
    sideDrawerToggleHandler = () => {
        console.log('in sideDrawerToggleHandler () ');
        this.setState( ( prevState ) => {return {sideDrawerClosed : !prevState.sideDrawerClosed}});
    }

    render(){
        return (
            <Aux>
                <Toolbar click= {this.sideDrawerToggleHandler}
                         isAuth= {this.props.isAuth}/>
                <BackDrop show={!this.state.sideDrawerClosed} 
                          back= {this.closeSideDrawerHandler}/>
                <SideDrawer sideDrawerClosed = {this.state.sideDrawerClosed}
                            closeSideDrawer = {this.closeSideDrawerHandler}
                    />
                <main className={classes.Content}> 
                    { this.props.children }
                </main>
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return{
        isAuth : state.auth.idToken
    }
}
export default connect(mapStateToProps)(Layout);