import axios from 'axios';

const asyncUpdateCart = (data) => {
  return function(dispatch,getState){
      const apiCall = 'http://localhost:3001/carts/'+data.id;
      axios.put(apiCall, data)
    .then(res =>res.data)
    .then(carts => {
        dispatch({type : 'Carts', carts})
    }).catch(error => {

    })

  }
}
      

export default asyncUpdateCart;