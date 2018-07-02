import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import Logout from './containers/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import { withRouter } from 'react-router-dom'
import asyncComponent from './hoc/asyncComponent/asyncComponent'


const asyncCheckOut = asyncComponent( ()=> {
  return import('./containers/CheckOut/CheckOut')
} )

const asyncOrders = asyncComponent( ()=> {
  return import('./containers/Orders/Orders')
} )

const asyncAuth = asyncComponent( ()=> {
  return import('./containers/Auth/Auth')
} )

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignUp()
  }
  render() {

    let route = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        {/* <Redirect to="/" /> */}
      </Switch>
    )
    if (this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckOut} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route to="/" component={BurgerBuilder} />
        </Switch>
      )
    }


    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken
  }
}

const mapDispatchToState = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authStateCheck())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToState)(App));
