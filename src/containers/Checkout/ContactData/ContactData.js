import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios/axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{

    state = {
        orderForm : {
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
                touched: false,
                valid: false
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
                touched: false,
                valid: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                touched: false,
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country Name'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false,
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"},
                    ]
                },
                value:'fastest',
                validation:{},
                valid: true
            },
        },
        formIsValid: false,
    }

    orderHandler = (e) => {
        e.preventDefault()
        const formData = {};
        
        for(let fromElementIdentifer in this.state.orderForm){
            formData[fromElementIdentifer] = this.state.orderForm[fromElementIdentifer].value;
        }
        const order = {
            ingredients : this.props.ings,
            amount : this.props.price,
            orderData : formData
        }
        
        this.props.onOrderBurger(order)
    }

    inputChangedHandler = (event,inputIdentifer) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderElement = {
            ...updatedOrderForm[inputIdentifer]
        }
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkVailidy(updatedOrderElement.value, updatedOrderElement.validation);
        
        let formIsValid = true;
        for(let inputIdentifer in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifer].valid && formIsValid
        }
        console.log(formIsValid)
        updatedOrderElement.touched = true; 
        updatedOrderForm[inputIdentifer] = updatedOrderElement;
        this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid})

    }

    checkVailidy(value, rules) {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid; 
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid

    }

    render() {
        let formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    
                    {formElementArray.map(formEle => {
                        return (
                            <Input
                                key={formEle.id} 
                                elementType={formEle.config.elementType} 
                                elementConfig={formEle.config.elementConfig} 
                                value={formEle.config.value}
                                invalid={!formEle.config.valid}
                                shouldValidate={formEle.config.validation}
                                touched={formEle.config.touched}
                                changed={(event) => this.inputChangedHandler(event,formEle.id)}/>
                        )
                    })}
                    <Button btnType="Success" disabled={!this.state.formIsValid} type="submit">ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return (    
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalBurger,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));