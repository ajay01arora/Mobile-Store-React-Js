import axios from 'axios';


const asyncLogin = (username, password) => {
  return dispatch=>{
      const apiCall = 'http://localhost:3001/users'+'?username='+username+'&password='+password;
      return new Promise((resolve,reject) => { 
    axios.get(apiCall)
    .then(res =>res.data)
    .then(login => {
      dispatch({type : 'Login', login})
    }).catch(error => {

    })
  
  })  
  }
}

export default asyncLogin;