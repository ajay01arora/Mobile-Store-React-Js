import React from 'react';
import './App.css';
import LoginForm from './components/login';
import ProductList from './components/products';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "./actions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
        {props.isLoggedIn &&
        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"> Login</span></Link></li>
        }
        {!props.isLoggedIn &&
        <li onClick={logout}><span className="glyphicon glyphicon-log-out"> Logout</span></li>
        }
        <li><Link to="/cart"><span className="glyphicon  glyphicon-shopping-cart"> Cart </span></Link></li>        
      </ul>
    </div>
  </nav>
    <div>
    <Switch>
           <Route exact path='/login' component={LoginForm}/>
           <Route exact path='/' component={ProductList}/>
        </Switch>
    </div>
</div>
</Router>

  );
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.LoginReducer.isLoggedIn
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
