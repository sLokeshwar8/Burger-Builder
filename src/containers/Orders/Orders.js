import React,{ Component } from "react";

import Order from '../../components/Order/Order';
import axios from '../../axios/axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        order : [],
        loading : true
    }

    componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        let  orders = <Spinner /> ;
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.amount}/>
                ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : () => dispatch(action.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));