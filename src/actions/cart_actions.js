import axios from 'axios';

const asyncAddToCart = (data) => {
  return function(dispatch,getState){
      const apiCall = 'http://localhost:3001/carts';
    axios.post(apiCall, data)
    .then(res =>res.data)
    .then(carts => {
      dispatch({type : 'Carts', carts})
    }).catch(error => {

    })
  }
}

export default asyncAddToCart;