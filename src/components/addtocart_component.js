import React from 'react';
import { connect } from "react-redux";
import  asyncAddToCart from "../actions/cart_actions";

function AddToCartComponent(props)
{
    function addToCartHandler(prod_id)
    {
        let tempUserId = localStorage.getItem('tempUserId');
        if( tempUserId === null)
        {
            tempUserId = Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem('tempUserId',tempUserId)
        }
           let data =
            {
                "user_id" : tempUserId,
                "product_id": prod_id,
                "quantity" : 1
            }

            props.addToCart(data);
            alert("Successfully added!");
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