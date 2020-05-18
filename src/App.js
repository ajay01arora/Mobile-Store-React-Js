import React from 'react';
import './App.css';
import LoginForm from './components/login_component';
import ProductList from './components/products_component';
import ProductView from './components/productView_component';
import CartComponent from './components/cart_component';
import asyncLogout from './actions/logout_actions';
import { connect } from "react-redux";
import { BrowserRouter as Router,  Switch,  Route,  Link } from "react-router-dom";


function App(props) {
  return (
    <Router>
    <div>
      <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
      <Link to="/"><span className="navbar-brand">Mobile-Online</span></Link>
      </div>
      
      <ul className="nav navbar-nav navbar-right">
        {!props.isLoggedIn &&
        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"> Login</span></Link></li>
        }
        {props.isLoggedIn &&
        <li onClick={props.logout}><span className="glyphicon glyphicon-log-out"> Logout</span></li>
        }
        <li><Link to="/cart"><span className="glyphicon  glyphicon-shopping-cart"> Cart </span></Link></li>        
      </ul>
    </div>
  </nav>
    <div>
    <Switch>
           <Route exact path='/login' component={LoginForm}/>
           <Route exact path='/cart' component={CartComponent}/>
           <Route exact path='/' component={ProductList}/>
           <Route path="/product/:id" component={ProductView} />
        </Switch>
    </div>
</div>
</Router>

  );
}

function mapStateToProps(state) {
  return {    
    isLoggedIn: state.LoginReducer.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(asyncLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);