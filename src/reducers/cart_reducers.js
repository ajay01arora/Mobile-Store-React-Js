
function CartReducer (state ={}, action)
{
    switch(action?.type){
        case "Carts":
                let ret =[];
                action.carts.map((cart) =>
                {
                    let product = action.Products.find(prod => prod.id === cart.product_id);
                    return ret.push({
                        cart_id : cart.id,
                        product_id : product.id,
                        image : product.image,
                        mobile_name : product.name,
                        quantity : cart.quantity,
                        price : product.price
                    })
                })

              return {cart : ret};
        case "RemovedItem":
            return {cart : null};
        default:
            return {
                cart : "no-data"                
              }
    }
}

export default CartReducer;
