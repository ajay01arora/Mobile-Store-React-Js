import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/reducers";
import asyncProducts from './actions/products_actions'



const store = createStore(rootReducer, applyMiddleware(thunk));
console.log("store.getState()", store.getState());
store.dispatch(asyncProducts(null));
store.subscribe(() => console.log("store", store.getState()));

export default store;


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
