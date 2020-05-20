import React from 'react';
import { connect } from "react-redux";
import  asyncAddToCart from "../actions/cart_actions";

function AddToCartComponent(props)
{
    function addToCartHandler(prod_id)
    {
           let data =
            {
                "user_id" : 1,
                "product_id": prod_id,
                "quantity" : 1
            }

            props.addToCart(data);
    }

    return (
        <button className="btn-danger" onClick={(e) => addToCartHandler(props.post_id, e)}>Add to Cart</button>
    );
}

function mapStateToProps(state) {    
    return {};
  }
  
  const mapDispatchToProps = dispatch => ({
    addToCart : (data) => dispatch(asyncAddToCart(data))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddToCartComponent);