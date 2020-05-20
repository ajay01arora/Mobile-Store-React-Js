import React, {Component} from 'react';
import { connect } from "react-redux";
import asyncLogin from "../actions/login_actions";
import { currentUserSubject } from "../utils/utility";

class LoginForm extends Component
{
    constructor()
    {
        super();
        
        this.state = {
            username : '',
            password : '',
            loginError:false
        }
    }

    render()
    {
        return (
            <div align="center">
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
        console.log(this.state.username);   
        console.log(this.props);   
         this.props.login(this.state.username,this.state.password)
         .then(res=>{
             console.log("res===",res)
             let loginSuccess=false;
             if(res.length>0){
                 res.map(data=>{
                     console.log("data",data,this.state,this.props)
                     if(data.username==this.state.username && data.password==this.state.password){
                         console.log('indide the success true')
                         localStorage.setItem("userData",JSON.stringify(data));
                         currentUserSubject.next(data);
                         loginSuccess=true;
                        //  return data

                     }
                     if(loginSuccess){
                        console.log('indide the success true')
                         this.props.history.push('/')
                     }
                     else{
                         this.setState({loginError:true})
                     }
                 })
                // localStorage.setItem("rcRoomId", .rcRoomId);
                // currentUserSubject.next(data);
      

             }
         })
    }

    
    changeHandler = event =>
    {
        this.setState({
            username : event.target.name === "username" ? event.target.value : this.state.username,
            password : event.target.name === "password" ? event.target.value : this.state.password
        })
    }
}

function mapStateToProps(state)
 {
     return {};
  }
  
  const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(asyncLogin(username, password))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
