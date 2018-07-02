import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actionType from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            }
        },
        isSignUp: true

    }

    componentDidMount = ( ) => {
        if( !this.props.buildingBurger && this.props.authRedirectPath !== "/"){
            this.props.onSetAuthRedirectPath()
        }
    }
    checkValidity(value, rule) {
        let isValid = true
        if (rule.required) {
            isValid = value.trim() !== '' && isValid
            // console.log('required', isValid)
        }
        if (rule.minLength) {
            isValid = value.toString().length >= rule.minLength && isValid
            // console.log('minLength', isValid)
        }
        if (rule.maxLength) {
            isValid = value.toString().length <= rule.maxLength && isValid
            // console.log('maxLength', isValid)
        }
        return isValid
    }


    onChangeHandler = (event, formIdentifier) => {
        // console.log(event.target.value);
        const updatedControls = { ...this.state.controls }
        const updatedControlsElement = { ...updatedControls[formIdentifier] }
        updatedControlsElement.value = event.target.value
        updatedControlsElement.touched = true;
        updatedControlsElement.isValid = this.checkValidity(updatedControlsElement.value, updatedControlsElement.validation)
        updatedControls[formIdentifier] = updatedControlsElement
        this.setState({ controls: updatedControls })
    }
    onSumitHandler = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthHandler = () => {
        this.setState(prevState => { return { isSignUp: !prevState.isSignUp } })
    }
    render() {

        let formElementArray = []

        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementArray.map(formElement => {
            return <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                label={formElement.config.elementConfig.placeholder}
                changed={(event) => this.onChangeHandler(event, formElement.id)}
                isInvalid={!formElement.config.isValid}
                shouldValidated={formElement.config.validation.required}
                touched={formElement.config.touched}
            ></Input>
        })
        // console.log(formElementArray)

        let output = (
            <div>
                <form onSubmit={this.onSumitHandler} >
                    {form}
                    < br />
                    <Button btntype="Success"> SUBMIT </Button>
                </form >
                <Button btntype="Danger"
                    clicked={this.switchAuthHandler}
                > Switch To {this.state.isSignUp ? "SignIn" : "Sign Up"}</Button>
            </div>
        )
        if (this.props.loading) {
            output = <Spinner />
        }
        if (this.props.error) {
            output = <div>
                {this.props.error.message}
                {output}
            </div>
        }
        output = this.props.isAuth ?  <Redirect to={this.props.authRedirectPath} /> : output 

        return output
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.idToken != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (email, password, isSignUp) => { dispatch(actionType.auth(email, password, isSignUp)) },
        onSetAuthRedirectPath: () => { dispatch(actionType.setAuthRedirectPath('/'))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);