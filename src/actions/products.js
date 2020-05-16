import axios from 'axios';

const asyncProducts = (add) => {
return function(dispatch,getState){
    const api = 'http://localhost:3000/products';
    let apiCall = add !== null ? api+add : api;
  axios.get(apiCall)
  .then(res =>res.data)
  .then(products => {
    dispatch({type : 'Products', products})
  }).catch(error => {

  })
}
}

export default asyncProducts;