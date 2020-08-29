import React,{ Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summay = <Redirect to="/"/>
        const purchaseredirection = this.props.purchase ? <Redirect to="/"/> : null
        if(this.props.ings) {
            summay = (
                    <div>
                        {purchaseredirection}
                        <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                        <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                    </div>
                    )
        }
        return summay
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchase: state.order.purchased
    }
        
}


export default connect(mapStateToProps)(Checkout)
// for only passing dispatch 
// connect(null, mapStateToDispatch) first arguments always be mapStateToProps