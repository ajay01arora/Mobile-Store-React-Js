import axios from 'axios';

const asyncAddToCart = (data) => {
  return function(dispatch,getState){
    let shouldAddtoCart = true;
      const apiCall = 'http://localhost:3001/carts';
      axios.get(apiCall)
      .then(res => res.data)
      .then(carts => {
        if(carts.length > 0)
        {
          
        carts.map(cart =>
          {
            if(cart.user_id === data.user_id && cart.product_id == data.product_id)
            {
              shouldAddtoCart = false;
              let updatedApi = apiCall +"/"+cart.id;
              let updatedData =
              {               
                  "user_id": cart.user_id,
                  "product_id": cart.product_id,
                  "quantity": ++cart.quantity,
                  "id": cart.id
                 
              }
              return updateCart(updatedApi, updatedData, dispatch);
            }          
          })
        }else{
          return addToCart(apiCall, data, dispatch)
        }         
        if(shouldAddtoCart)
        {
          return addToCart(apiCall, data, dispatch)
        }
        
        
        })
        
  }
}

function addToCart(apiCall, data, dispatch)
{
  axios.post(apiCall, data)
    .then(res =>res.data)
    .then(carts => {
      dispatch({type : 'Carts', carts})
    }).catch(error => {

    })
}

function updateCart(apiCall, data, dispatch)
{
  axios.put(apiCall, data)
  .then(res =>res.data)
  .then(carts => {
    dispatch({type : 'Carts', carts})
  }).catch(error => {

  })

}

export default asyncAddToCart;