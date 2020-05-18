
function ProductReducer (state ={}, action)
{
    switch(action?.type){
        case "Products":
              return {products : action.products};
        default:
            return {
                products : null                
              }
    }
}

export default ProductReducer;
