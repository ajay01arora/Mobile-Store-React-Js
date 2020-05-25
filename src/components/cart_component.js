import React, {Component} from 'react';
import { connect } from "react-redux";
import asyncGetCartDetails from "../actions/cartDetails_actions";
import asyncRemoveFromCart from '../actions/RemovedFromCart_actions';
import asyncUpdateCart from '../actions/updateCart_actions';
import {UserContext} from '../App';

let cartLength = 0;
let updateStatus = false;
let tempCartDetails  = null;
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
        let total =0;
        return (
            <UserContext.Consumer>
            {(user) => {  
                return(         
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
                        
                        total += cart.price*cart.quantity;
                        return  (                        
                        <tr key={index}>
                            <td><img src={cart.image} alt={cart.mobile_name} height="40%"/></td>
                            <td>{cart.mobile_name}</td>
                            <td><input type="number" min="1" max="5" value={cart.quantity} onChange={(e) => this.UpdateCartQuantityHandler(cart , e)} /></td>
                            <td>₹ {cart.price*cart.quantity}</td>
                            <td><button className="btn-Danger" onClick={(e) => this.RemoveItemHandler(cart, e)}>Remove</button></td>                            
                        </tr>
                        );         
                    }
                    )}  
                    <tr>
                        <td colSpan="4"><b>Total</b></td> 
                        <td>₹ {total}</td>     
                    </tr>               
                    </tbody>
                </table>
                </div>
                <div className="row">
                    <div className="col-md-offset-10">
                        <button className="btn-primary" onClick={(e) => this.placeOrderHandler(user, e)}>Place Order</button>
                    </div>
                </div>
            </div>)
            }}
            </UserContext.Consumer>     
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
        if(this.state.cartDetails === null)
        {
            let tempUserId = localStorage.getItem('tempUserId');
            if( tempUserId === null)
            {
                tempUserId = Math.floor(1000 + Math.random() * 9000);
                localStorage.setItem('tempUserId',tempUserId)
            }            
            this.props.GetCartDetails(tempUserId);
        }
 
    }

    shouldComponentUpdate(nextprops, nextState)
    {
        if(nextprops.cartDetails !== tempCartDetails)
        {
            return true;
        }
        else if(updateStatus)
        {
            return true;
        }
        else{
            return false;
        }
    }

    getSnapshotBeforeUpdate(previousprops, previousState)
    {        
       tempCartDetails = previousprops.cartDetails;
    }
    
    componentDidUpdate(nextprops)
    {
        updateStatus = false;
        if(this.props.cartDetails === null)
        {
            let tempUserId = localStorage.getItem('tempUserId');
            if( tempUserId === null)
            {
                tempUserId = Math.floor(1000 + Math.random() * 9000);
                localStorage.setItem('tempUserId',tempUserId)
            }
            this.props.GetCartDetails(tempUserId);
        }
        
        if(this.props.cartDetails != null)
        {
            this.setState({cartDetails : this.props.cartDetails});
        }
    }
    
    UpdateCartQuantityHandler(cart , event)
    {
        let cartCopy = JSON.parse(JSON.stringify(this.state.cartDetails))
        let data;
        cartCopy.forEach(element => {

            if(element.cart_id === cart.cart_id)
            {
                updateStatus = true;                
                element.quantity = parseInt(event.target.value);
                element.price *= parseInt(event.target.value);
                let tempUserId = localStorage.getItem('tempUserId');
                if( tempUserId === null)
                {
                    tempUserId = Math.floor(1000 + Math.random() * 9000);
                    localStorage.setItem('tempUserId',tempUserId)
                }
                data =  {               
                    "user_id": tempUserId,
                    "product_id": cart.product_id,
                    "quantity": parseInt(event.target.value),
                    "id": cart.cart_id
                   
                }
            }
        });
        this.props.UpdateCart(data);
        this.setState({
            cartDetails:cartCopy 
        }) 

    }

    placeOrderHandler(user)
    {
        if(user)
        {
            let orderNumber = Math.floor(1000 + Math.random() * 9000);
            if(this.state.cartDetails !== null)
            {
              this.state.cartDetails.forEach(element => {
                  this.RemoveItemHandler(element);
              });  
            }
            alert("Your order has been placed successfully. and your order id is: ORD"+orderNumber);
            this.props.history.push('/')
        }
        else
        {
            alert("You must logged in to place this order.");
        }
        
    }
 

    RemoveItemHandler(cart)
    {
        let tempUserId = localStorage.getItem('tempUserId');
        if( tempUserId === null)
        {
            tempUserId = Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem('tempUserId',tempUserId)
        }
        let data =
        {
            "user_id": tempUserId,
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
    RemoveCartItem : (data) => dispatch(asyncRemoveFromCart(data)),
    UpdateCart : (data) => dispatch(asyncUpdateCart(data))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
