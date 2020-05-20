import React,  {Component, componentDidMount} from 'react';
import { connect } from "react-redux";
import  asyncProductDetailsById from "../actions/productDetails_actions";
import  asyncProducts from "../actions/products_actions";
import  AddToCartComponent from "./addtocart_component";


class ProductView extends Component
{   
    constructor ()
    {
        super();
        this.state =
        {

        }
    }
    componentDidMount()
    {
        this.props.getProductDetailsById(this.props.match.params.id);
        if(this.props.location.post === null)
        {
            this.props.GetProducts('/'+this.props.match.params.id);
        }
    }

    render()
    {
             
        if(this.props.productDetails != null)
        {
            let post = this.props.location.post ? this.props.location.post :  this.props.products[0];   
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <img src={post.image } alt={post.name} height="200px" />
                        </div>
                        <div className="col-md-5">
                            <h3>{post.name}</h3>
                            <table class="table table-hover">
                                <tbody>
                                    <tr>
                                        <th>Price</th>
                                        <td>{post.price}</td>
                                    </tr>
                                    <tr>
                                        <th>ModelNumber : </th>
                                        <td>{this.props.productDetails.model_number}</td>
                                    </tr>
                                    <tr>
                                        <th>Color</th>
                                        <td>{this.props.productDetails.color}</td>
                                    </tr>
                                    <tr>
                                        <th>Scrren size : </th>
                                        <td>{this.props.productDetails.screen_size}</td>
                                    </tr>
                                    <tr>
                                        <th>Operating System</th>
                                        <td>{this.props.productDetails.os}</td>
                                    </tr>
                                    <tr>
                                        <th>RAM: </th>
                                        <td>{this.props.productDetails.Ram}</td>
                                    </tr>
                                    <tr>
                                        <th>Storage: </th>
                                        <td>{this.props.productDetails.Storage}</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </div>
                        <div className="col-md-3">
                        <AddToCartComponent post_id={this.props.productDetails.id} />
                        </div>
                    </div>   
                </div>
            );
        }else
        {
            return <div><h1>Fetching...</h1></div>;
        }
    }    
}


function mapStateToProps(state) {
    return {
      productDetails: state.ProductDetailsReducer.productDetails,
      products: state.ProductReducer.products

    };
  }
  
  const mapDispatchToProps = dispatch => ({
    getProductDetailsById: (id) => dispatch(asyncProductDetailsById(id)),
    GetProducts: (add) => dispatch(asyncProducts(add))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
