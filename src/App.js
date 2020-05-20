import React from 'react';
import './App.css';
import LoginForm from './components/login_component';
import ProductList from './components/products_component';
import ProductView from './components/productView_component';
import CartComponent from './components/cart_component';
import asyncLogout from './actions/logout_actions';
import { connect } from "react-redux";
import { BrowserRouter as Router,  Switch,  Route,  Link, Redirect } from "react-router-dom";
import { authenticationService, currentUserSubject } from "./utils/utility";
import UserContext   from './context/userContext'
// const ContextA = React.createContext();

// import store from './store';
// import { Provider } from "react-redux";





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
        return (<Redirect to="/" />);
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
        <li onClick={this.logout}><span className="glyphicon glyphicon-log-out"> Logout</span></li>:<li><Link to="/login"><span className="glyphicon glyphicon-log-in"> Login</span></Link></li>
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