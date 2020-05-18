import axios from 'axios';


const asyncLogin = (username, password) => {
  return dispatch=>{
      const apiCall = 'http://localhost:3001/users';
      return new Promise((resolve,reject) => {
        axios.get(apiCall)
    .then(res =>res.data)
    .then(users => {
      console.log("logiin data===",users)
      resolve(users);
     return dispatch({type : 'Login', users , 'username' : username, 'password' : password})
    }).catch(error => {
      reject(error)
    })
  });
  }
}

export default asyncLogin;