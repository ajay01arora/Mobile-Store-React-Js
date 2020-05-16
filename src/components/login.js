import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../actions";

class LoginForm extends Component
{
    constructor()
    {
        super();
        
        this.state = {
            username : '',
            password : ''
        }
    }

    render()
    {
        return (
            <div align="center">
                <form className="loginForm"  onSubmit={this.onSubmit}>

                    
                    <input type="text" name="username"  placeholder="Enter username" required value={this.state.username}  onChange={this.changeHandler} />
                    <br/>

                    
                    <input type="password" name="password" placeholder='Enter password' required value={this.state.password} onChange={this.changeHandler}/>
                    <br/>
                    
                    <input type="submit" value="Login"/> 
                </form>
            </div>
        );
    }

    onSubmit = event =>
    {
        event.preventDefault();
        console.log(this.state.username);   
        this.props.login(this.state.username,this.state.password); 
    }

    
    changeHandler = event =>
    {
        this.setState({
            username : event.target.name === "username" ? event.target.value : this.state.username,
            password : event.target.name === "password" ? event.target.value : this.state.password
        })
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
