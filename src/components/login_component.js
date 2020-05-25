import React, {Component} from 'react';
import { connect } from "react-redux";
import asyncLogin from "../actions/login_actions";
import './login_component.css';

let changeStatus = false;
class LoginForm extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            username : '',
            password : '',
            loginError:false
        }

    }

    render()
    {      
        return (
            <div className="login" align="center">
                <form className="loginForm"  onSubmit={this.onSubmit}>
                    {this.state.loginError?<div>Failure in Login try again</div>:""}
                    
                    <input type="text" name="username"  placeholder="Enter username" required value={this.state.username}  onChange={this.changeHandler} />
                    <br/>
                    
                    <input type="password" name="password" placeholder='Enter password' required value={this.state.password} onChange={this.changeHandler}/>
                    <br/>
                    
                    <input type="submit" value="Login"/> 
                </form>
            </div>
        );
    }

    onSubmit = async event =>
    {
        event.preventDefault();
        console.log('username: '+this.state.username);   
        console.log('password: '+this.state.password);   
        this.props.login(this.state.username,this.state.password)
    }

    shouldComponentUpdate(nexprops, nextState)
    {
        if(this.props.loggedResult !== nexprops.loggedResult || changeStatus)
        {
            return true
        }
        else{
            return false;
        }
    }

    getSnapshotBeforeUpdate()
    {
        return {};
    }
    
    componentDidUpdate()
    {
        
        if(this.props.loggedResult.error && changeStatus)
        {
            changeStatus =false;
            this.setState({
                loginError : true
            })
        }
        if(this.props.loggedResult.isLoggedIn)
        {
            this.props.history.push('/');
        }
    }

    changeHandler = event =>
    {
        changeStatus = true;
        this.setState({
            username : event.target.name === "username" ? event.target.value : this.state.username,
            password : event.target.name === "password" ? event.target.value : this.state.password
        })
    }
}

function mapStateToProps(state)
 {
     return {
         loggedResult : state.LoginReducer
     };
  }
  
  const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(asyncLogin(username, password))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
