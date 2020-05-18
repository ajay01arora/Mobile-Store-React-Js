import axios from 'axios';

const asyncRemoveFromCart = (data) => {
    return function(dispatch,getState){
        const apiCall = 'http://localhost:3000/carts/'+data.id;
      axios.delete(apiCall, data)
      .then(res =>       
        dispatch({type : 'RemovedItem' })
      )
    .catch(error => {
  
      })
    }
  }

  export default asyncRemoveFromCart;
