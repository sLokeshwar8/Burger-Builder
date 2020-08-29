import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
//redux
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import { logger } from 'redux-logger';  // without plugin you can create your own logger

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const logger = store => {
  return next => {
      return action => {
        //here we can now execute the code we want to run in between the action and reducer.
        console.log('[middleware] Dispatching', action);
        const result = next(action); // unmodify action
        console.log('[middleware] next state', store.getState())
        return result
      }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// logger will return function and soon it will getting 'store' 
// the other function will recevie 'next'(name not fixed) argument 
// next mean, you can execute to let the action continue its journey onto the reducer
// you might know this next function if you experienced  express developer
// whatever this function return it will excuted by redux in the end


const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(logger, thunk)));
 
const app = (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    {app}
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
