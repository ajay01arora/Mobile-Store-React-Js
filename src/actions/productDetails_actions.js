import axios from 'axios';

const asyncProductDetailsById = (value) => {
    return function(dispatch,getState){
        const api = 'http://localhost:3000/product_details/'+value;    
    axios.get(api)
    .then(res =>res.data)
    .then(productDetails => {
        dispatch({type : 'ProductDetails', productDetails})
    }).catch(error => {

    })
    }
}

export default asyncProductDetailsById;