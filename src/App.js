import React, {Component} from 'react';
import './App.css';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';

class App extends Component{
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={ Checkout }/>
            <Route path="/orders" component={ Orders }/>
            <Route path="/Auth" component={ Auth }/>
            <Route path="/" exact component={ BurgerBuilder }/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
