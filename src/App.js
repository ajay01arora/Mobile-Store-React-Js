import React from 'react';
import './App.css';
import LoginForm from './components/login_component';
import Product from './components/products_component';
import ProductView from './components/productView_component';
import CartComponent from './components/cart_component';
import asyncLogout from './actions/logout_actions';
import { connect } from "react-redux";
import { BrowserRouter as Router,  Switch,  Route,  Link, Redirect } from "react-router-dom";
import { currentUserSubject } from "./utils/utility";
import UserContext   from './context/userContext'
import {Dropdown}from 'react-bootstrap';

class App extends React.Component{
  // constructor(props){
  //   super(props)
  //   this.state={
  //     currentUser:{}
  //   }
  // }



  state = {
    username : '',
    password : '',
    loginError:false
}

static contextType = UserContext;
  async componentWillMount(){
    //   await authenticationService.currentUser.subscribe(x => {
    //   console.log("x======",x);
     
    //   this.setState({
    //     currentUser: x
    //   });
  
    // })
  }

   logout=async ()=>{
    console.log(this.props)
  // const res=await  
   this.props.logout()
    .then(res=>{
      if(res){
       console.log(res,this)
        localStorage.removeItem("userData")
        currentUserSubject.next(null)
        this.context.setUser(null)
       //window.location.reload();
      }
   })
  }


  

  render(){
    console.log("context======1",this.context)
  return (
    // <userContext.Provider value={this.state.currentUser}>
    // <UserProvider value={this.state.currentUser}>
    <Router  >
    <div>
      <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
      <Link to="/"><span className="navbar-brand">Mobile-Online</span></Link>
      </div>
      
      <ul className="nav navbar-nav navbar-right">
        {this.context.user ?
        <Dropdown>
        <Dropdown.Toggle className="dropdownLogout" variant="secondary" id="dropdown-basic">
          <img src="https://cdn5.vectorstock.com/i/1000x1000/73/39/user-icon-male-person-symbol-profile-avatar-vector-20787339.jpg" alt="UserImage" width="20" height="20" />
        </Dropdown.Toggle>      
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.logout}><span className="glyphicon glyphicon-log-out"> Logout</span></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  
    :        
        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"> Login</span></Link></li>
        }
        <li><Link to="/cart"><span className="glyphicon  glyphicon-shopping-cart"> Cart </span></Link></li>        
      </ul>
    </div>
  </nav>
    <div>
    <Switch>
           <Route exact path='/login' component={LoginForm}/>
           <Route exact path='/cart' component={CartComponent}/>
           <Route exact path='/' component={Product}/>
           <Route exact path='/products' component={Product}/>
           <Route path="/product/:id" component={ProductView} />
        </Switch>
    </div>
</div>
</Router>
// </UserProvider>
// </userContext.Provider >
  );
      }
}

function mapStateToProps(state) {
  return {    
    isLoggedIn: state.LoginReducer.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(asyncLogout())
});

export default connect(mapStateToProps, mapDispatchToProps )(App);