import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentDidUpdate(){
        console.log('[order summary]')
    }

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
           return  <li key={igkey}><span style={{textTransform : 'capitalize' }}>{igkey}</span> : {this.props.ingredients[igkey]}</li>
        })
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A deliceous burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Continue to checkout ?</p>
                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
} 

export default OrderSummary;