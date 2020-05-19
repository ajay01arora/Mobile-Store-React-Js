import React, {Component} from 'react';
import { connect } from "react-redux";
import asyncGetCartDetails from "../actions/cartDetails_actions";
import asyncRemoveFromCart from '../actions/RemovedFromCart_actions';

let cartLength = 0;
let updateStatus = false;
class CartComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {cartDetails : props.cartDetails}
    }

    render()
    {
        if((this.state.cartDetails !== null && this.state.cartDetails.length > 0) || updateStatus)
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
                    {this.state.cartDetails.map((cart, index) =>
                    {
                        return  (                        
                        <tr key={index}>
                            <td><img src={cart.image} alt={cart.mobile_name} height="40%"/></td>
                            <td>{cart.mobile_name}</td>
                            <td><input type="number" min="1" max="5" value={cart.quantity} onChange={(e) => this.UpdateCartQuantityHandler(cart , e)} /></td>
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

    async componentDidMount()
    {
        if(this.state.cartDetails === null)
        {
           await this.props.GetCartDetails(1);
        }

        if(this.props.cartDetails !== null)
        {
            this.setState({
                cartDetails : this.props.cartDetails
            });
        }
 
    }

    shouldComponentUpdate(nextprops, nextState)
    {
        if(nextprops.cartDetails !== null && nextprops.cartDetails.length !== cartLength)
        {            
            return true;
        }        
        else if(nextprops.cartDetails == null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    getSnapshotBeforeUpdate(nextprops, nextState)
    {        
        cartLength = nextprops.cartDetails?.length;
        return null;
    }
    
    componentDidUpdate(nextprops)
    {
        if(nextprops.cartDetails === null || nextprops.cartDetails.length !== cartLength)
        {
            this.props.GetCartDetails(1);
        }
        
        if(this.props.cartDetails != null)
        {
            this.setState({cartDetails : this.props.cartDetails});
        }
    }
    
    UpdateCartQuantityHandler(cart , event)
    {
        let cartCopy = JSON.parse(JSON.stringify(this.state.cartDetails))
        cartCopy.forEach(element => {
            if(element.cart_id == cart.cart_id)
            {
                updateStatus = true;                
                element.quantity = parseInt(event.target.value);
                element.price *= parseInt(event.target.value); 
            }
        });
        this.setState({
            cartDetails:cartCopy 
        }) 
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
          cartLength--;
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
