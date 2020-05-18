import axios from 'axios';

const asyncLogin = (username, password) => {
  return function(dispatch,getState){
      const apiCall = 'http://localhost:3000/users';
    axios.get(apiCall)
    .then(res =>res.data)
    .then(users => {
      dispatch({type : 'Login', users , 'username' : username, 'password' : password})
    }).catch(error => {
  
    })
  }
}

export default asyncLogin;