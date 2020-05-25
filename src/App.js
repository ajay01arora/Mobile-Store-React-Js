import React from 'react';
import './App.css';
import LoginForm from './components/login_component';
import Product from './components/products_component';
import ProductView from './components/productView_component';
import CartComponent from './components/cart_component';
import asyncLogout from './actions/logout_actions';
import { connect } from "react-redux";
import { BrowserRouter as Router,  Switch,  Route,  Link } from "react-router-dom";
import {Dropdown}from 'react-bootstrap';

export const UserContext = React.createContext();
let cartLength = 0;
class App extends React.Component{

  constructor(props)
  {
    super(props)

    this.state={
      isLoggedIn : false,
      carts : this.props.carts
    }
  }

  componentDidMount()
  {
    // if(this.state.carts === null)
    //     {
    //         let tempUserId = localStorage.getItem('tempUserId');
    //         if( tempUserId === null)
    //         {
    //             tempUserId = Math.floor(1000 + Math.random() * 9000);
    //             localStorage.setItem('tempUserId',tempUserId)
    //         }            
    //         this.props.getcart(tempUserId);
    //     }  
  }

render()
{
  let user = JSON.parse(localStorage.getItem('user'))
  return (    
      <UserContext.Provider value={this.state.isLoggedIn}>
      <Router>
      <div>
        <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
        <Link to="/"><span className="navbar-brand">Mobile-Online</span></Link>
        </div>
        
        <ul className="nav navbar-nav navbar-right">
          {this.state.isLoggedIn ?
          <Dropdown>
          <Dropdown.Toggle className="dropdownLogout" variant="secondary" id="dropdown-basic">
            <img src="https://cdn5.vectorstock.com/i/1000x1000/73/39/user-icon-male-person-symbol-profile-avatar-vector-20787339.jpg" alt="UserImage" width="20" height="20" />
            {
              user?.username
            }
          </Dropdown.Toggle>      
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.props.logout}><span className="glyphicon glyphicon-log-out"> Logout</span></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>    
      :        
          <li><Link to="/login"><span className="glyphicon glyphicon-log-in"> Login</span></Link></li>
          }
          <li><Link to="/cart"><span className="glyphicon  glyphicon-shopping-cart"> Cart {this.state.carts?.length} </span></Link></li>        
        </ul>
      </div>
    </nav>
      <div>
      <Switch>
            <Route exact path='/login' component={LoginForm}/>
            <Route exact path='/cart' component={CartComponent}/>
            <Route exact path='/' component={Product}/>
            <Route path="/product/:id" component={ProductView} />
          </Switch>
      </div>
  </div>
  </Router>
  </UserContext.Provider>
    );
  
}
        shouldComponentUpdate(nextprops, nextState)
        {
            if(this.state.isLoggedIn !== nextprops.isLoggedIn)
            {
                return true;
            }
            else{
                return false;
            }
        }


        componentDidUpdate(nextprops)
        { 
            if(this.props.isLoggedIn != this.state.isLoggedIn)
            {
                this.setState({isLoggedIn : this.props.isLoggedIn});
            }                       
        }

}

function mapStateToProps(state) {
  return {    
    isLoggedIn: state.LoginReducer.isLoggedIn,
    carts : state.CartReducer.cart
  }
}

const mapDispatchToProps = dispatch => ({
  logout : () => dispatch(asyncLogout())
});

export default connect(mapStateToProps, mapDispatchToProps )(App);