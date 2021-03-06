import React, {Component} from 'react';

import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

     state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false,
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                touched: false,
                valid: false
            },
        },
        isSignup: true
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
        if(rules.isEmail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                    isValid = true
            }else{
                isValid = false
            }
        }
        return isValid

    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkVailidy(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switcAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }


    render() {
        let formElementArray = [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map( formEle => (
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
                
        )
        if(this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            ) 
        }
        return (
            <div className={classes.Auth}>
                    {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button  btnType="Success">SUBMIT</Button>
                </form>
                    <Button btnType="Danger" clicked={this.switcAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP' }</Button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 