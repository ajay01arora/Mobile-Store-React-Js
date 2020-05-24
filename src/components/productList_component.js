import React, { Component } from "react";
import {Link} from "react-router-dom";
import AddToCartComponent from './addtocart_component';

class ProductList extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {products : props.products};

    }

    render()
    {
        this.state.products.map((product, index) => {
        return(
            <div className="col-md-4" key={index}>
                                <div className="card">
                                    <center>
                                    <div className="card-header">
                                        <img src={product.image} alt={product.name} height="200px" />
                                    </div>
                                    <div className="card-body">
                                        
                                        <h3>{product.name}</h3>                                   
                                    <h4> ₹ {product.price} </h4>
                                    </div>
                                    <div className="card-footer">
                                    <Link to={{pathname:'/product/'+product.id ,product:product}}><button className="ViewButton btn-primary">View</button></Link>
                                    
                                    {'       '}
                                        <AddToCartComponent post_id={product.id} />
                                    </div>
                                    </center>
                                </div>
                            </div>
            )
        })
        return <div />
    }
}

export default ProductList;