
function ProductDetailsReducer (state ={}, action)
{
    switch(action?.type){
        case "ProductDetails":
              return {productDetails : action.productDetails};
        default:
            return {
                productDetails : null                
              }
    }
}

export default ProductDetailsReducer;
