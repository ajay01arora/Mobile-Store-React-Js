import React,  {Component, componentDidMount} from 'react';
import { connect } from "react-redux";
import  asyncProductDetailsById from "../actions/productDetails_actions";
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
    }

    render()
    {
             
        if(this.props.productDetails != null)
        {
            let post = this.props.location.post;   
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <img src={post.image} alt={post.name} height="200px" />
                        </div>
                        <div className="col-md-5">
                            <ul>
                            <li><h3>{post.name}</h3></li>
                            <li> Price: <h4>{post.price}</h4></li>
                            <li> ModelNumber : {this.props.productDetails.model_number}</li>
                            <li>Color:{this.props.productDetails.color}</li>
                            <li>Screen Size:{this.props.productDetails.screen_size}</li>
                            <li> Operating System:{this.props.productDetails.os}</li>
                            <li> RAM:{this.props.productDetails.Ram}</li>
                            <li>Storage:{this.props.productDetails.Storage}</li>
                            </ul>
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
      productDetails: state.ProductDetailsReducer.productDetails
    };
  }
  
  const mapDispatchToProps = dispatch => ({
    getProductDetailsById: (id) => dispatch(asyncProductDetailsById(id))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
