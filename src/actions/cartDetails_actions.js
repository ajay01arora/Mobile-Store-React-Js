import axios from 'axios';

const asyncGetCartDetails = (data) => {
    return function(dispatch,getState){
        const apiCall = 'http://localhost:3001/carts';
      axios.get(apiCall)
      .then(res =>res.data)
      .then(carts => {
        
        let data = 'id=0';
        carts.map((cart) =>
        {
          data += '&id='+cart.product_id
        })

        const productApi = 'http://localhost:3001/products?'+data;
        axios.get(productApi)
        .then(res =>res.data)
        .then(products => {  

       return  dispatch({type : 'Carts', carts, 'Products' : products})
      })
    }).catch(error => {
  
      })
    }
}

export default asyncGetCartDetails;