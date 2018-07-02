import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
// import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionType from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false

            },
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
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'fastest' },
                        { value: 'cheapest', displayValue: 'cheapest' }
                    ]
                },
                value: 'fastest',
                isValid: true,
                validation: {

                }
            }

        },
        formIsValid: false
        // loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true })
        console.log('in on burger order')
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ings, //this.props.ingredients,
            price: this.props.price,
            formData: formData,
            userId: this.props.userId
        }
        console.log('in on burger order')
        this.props.onBurgerOrder(order, this.props.token)
        this.props.history.push('/')
        // this.setState({ loading: true })
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({ loading: false })
        //     console.log('done postingdata')
        //     this.props.history.push('/')
        // }).catch(error => {
        //     this.setState({ loading: false })
        // });
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
        console.log(event.target.value);
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedOrderFormElement = { ...updatedOrderForm[formIdentifier] }
        updatedOrderFormElement.value = event.target.value
        updatedOrderFormElement.touched = true;
        updatedOrderFormElement.isValid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        // console.log('making uofe.isvalid', isvalid)
        updatedOrderForm[formIdentifier] = updatedOrderFormElement
        let formIsValid = true;
        for (let formIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[formIdentifier].isValid && formIsValid
        }
        console.log('on change handler ', formIsValid)
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }
    render() {
        const formElementArray = []
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <div>
                {formElementArray.map(formelement =>
                    <Input key={formelement.id}
                        elementType={formelement.config.elementType}
                        elementConfig={formelement.config.elementConfig}
                        value={formelement.config.value}
                        label={formelement.config.elementConfig.placeholder}
                        changed={(event) => this.onChangeHandler(event, formelement.id)}
                        isInvalid={!formelement.config.isValid}
                        shouldValidated={formelement.config.validation}
                        touched={formelement.config.touched}
                    />
                )
                }
            </div>

        )

        if (this.props.loading)
            form = <Spinner />

        return (
            <div style={{ width: '80%', marginLeft: '10%', border: '1px solid #ccc' }}>
                <form onSubmit={this.orderHandler}>
                    <h4> Enter your details </h4>
                    {form}
                    <Button btntype="Success" disabled={!this.state.formIsValid} >ORDER</Button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        orders: state.order.orders,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(actionType.purchaseBurgerStart(orderData, token)),
        onInitPurchase: () => dispatch(actionType.onPurchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));