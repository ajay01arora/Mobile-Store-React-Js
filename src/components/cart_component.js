import React, {Component} from 'react';
import { connect } from "react-redux";
import asyncGetCartDetails from "../actions/cartDetails_actions";
import asyncRemoveFromCart from '../actions/RemovedFromCart_actions';

let cartLength = 0;
class CartComponent extends Component
{
    render()
    {
        if(this.props.cartDetails !== "no-data" && this.props.cartDetails.length > 0)
        {
        return (
            <div className="container">
                <h2>Carts Details</h2><hr/>
                <div className="row">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Device</th>
                        <th>Mobile Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.cartDetails.map((cart, index) =>
                    {
                        return  (                        
                        <tr key={index}>
                            <td><img src={cart.image} alt={cart.mobile_name} height="40%"/></td>
                            <td>{cart.mobile_name}</td>
                            <td><input type="number" id="quantity" name="quantity" min="1" max="5" value={cart.quantity} onChange={(e) => e.setState()} /></td>
                            <td>{cart.price}</td>
                            <td><button className="btn-Danger" onClick={(e) => this.RemoveItemHandler(cart, e)}>Remove</button></td>                            
                        </tr>
                        );         
                    }
                    )}                 
                    </tbody>
                </table>
                </div>
            </div>           
        );
        }else{
            return (
            <div>
                <h1>No item added</h1>
            </div>);
        }
    }

    componentDidMount()
    {
        this.props.GetCartDetails(1);
    }

    shouldComponentUpdate(nextprops, nextState)
    {
        if(nextprops.cartDetails !== null || nextprops.cartDetails.length !== cartLength)
        {
            return true;
        }else{
            return false;
        }        
    }
    componentDidUpdate()
    {
        this.props.GetCartDetails(1);
    }
    
    getSnapshotBeforeUpdate(nextprops, nextState)
    {
        cartLength = nextprops.cartDetails?.length;
    }

    RemoveItemHandler(cart)
    {
        let data =
        {
            "user_id": 1,
            "product_id": cart.product_id,
            "quantity": cart.quantity,
            "id": cart.cart_id
          }
        this.props.RemoveCartItem(data);
    }

    
}

function mapStateToProps(state) {
    return {
      cartDetails : state.CartReducer.cart
    };
  }
  
  const mapDispatchToProps = dispatch => ({
    GetCartDetails: (user_id) => dispatch(asyncGetCartDetails(user_id)),
    RemoveCartItem : (data) => dispatch(asyncRemoveFromCart(data))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
