import React,  {Component, componentDidMount} from 'react';
import { connect } from "react-redux";
import  asyncProductDetailsById from "../actions/productDetails_actions";
import  asyncProducts from "../actions/products_actions";
import  AddToCartComponent from "./addtocart_component";

let tempProduct = null;
let tempProductDetails = null;
class ProductView extends Component
{   
    constructor (props)
    {
        super(props);
        this.state =
        {
            product : this.props.product,
            productDetails : this.props.productDetails
        }
    }
    componentDidMount()
    {
        this.props.getProductDetailsById(this.props.match.params.id);
        if(this.props.location.product === undefined)
        {
            this.props.GetProducts('/'+this.props.match.params.id);
        }
        else
        {
            this.setState({
                product : this.props.location.product
            })
        }
    }

    render()
    {
             
        if(this.state.productDetails != null && this.state.product != null)
        {
              
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <img src={this.state.product.image } alt={this.state.product.name} height="200px" />
                        </div>
                        <div className="col-md-5">
                            <h3>{this.state.product.name}</h3>
                            <table class="table table-hover">
                                <tbody>
                                    <tr>
                                        <th>Price</th>
                                        <td>{this.state.product.price}</td>
                                    </tr>
                                    <tr>
                                        <th>ModelNumber : </th>
                                        <td>{this.state.productDetails.model_number}</td>
                                    </tr>
                                    <tr>
                                        <th>Color</th>
                                        <td>{this.state.productDetails.color}</td>
                                    </tr>
                                    <tr>
                                        <th>Scrren size : </th>
                                        <td>{this.state.productDetails.screen_size}</td>
                                    </tr>
                                    <tr>
                                        <th>Operating System</th>
                                        <td>{this.state.productDetails.os}</td>
                                    </tr>
                                    <tr>
                                        <th>RAM: </th>
                                        <td>{this.state.productDetails.Ram}</td>
                                    </tr>
                                    <tr>
                                        <th>Storage: </th>
                                        <td>{this.state.productDetails.Storage}</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </div>
                        <div className="col-md-3">
                        <AddToCartComponent post_id={this.state.productDetails.id} />
                        </div>
                    </div>   
                </div>
            );
        }else
        {
            return <div><h1>Fetching...</h1></div>;
        }
    }    

    shouldComponentUpdate(nextprops, nextState)
    {
        if(nextprops.product !== tempProduct)
        {
            return true;
        }
        else if(nextprops.productDetails !== tempProductDetails)
        {
            return true;
        }
        else{
            return false;
        }
    }

    getSnapshotBeforeUpdate(previousprops, previousState)
    {        
       tempProduct = previousprops.product;
       tempProductDetails = previousprops.productDetails;
    }
    
    componentDidUpdate(nextprops)
    {        
        if(this.props.product != null)
        {
                if(this.props.location.product === undefined)
                {
                    this.setState({
                        product : this.props.product
                    })
                }
                else
                {
                    this.setState({
                        product : this.props.location.product
                    })
                }
        }

        if(this.props.productDetails != null)
        {
            this.setState({productDetails : this.props.productDetails});
        }
    }
}


function mapStateToProps(state) {
    return {
      productDetails: state.ProductDetailsReducer.productDetails,
      product: state.ProductReducer.products

    };
  }
  
  const mapDispatchToProps = dispatch => ({
    getProductDetailsById: (id) => dispatch(asyncProductDetailsById(id)),
    GetProducts: (add) => dispatch(asyncProducts(add))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
