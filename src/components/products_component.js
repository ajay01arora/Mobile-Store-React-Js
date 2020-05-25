import React, {useState, useEffect, useContext, Component } from 'react';
import { connect } from "react-redux";
import  asyncProducts from "../actions/products_actions";
import {Link} from "react-router-dom";
import AddToCartComponent from './addtocart_component';

let sortAsc = true;
let pageNumber = 1;
let totalPages =0;


class  Product extends Component 
{    
   constructor(props)
    {
        super(props);
        
        this.state = {
            products : this.props.products,
            searchText : ''
        }
    }

    sortingClicked = event =>
    {
        if(sortAsc)
        {
            sortAsc = false;
            this.props.GetProducts('?_sort=price&_order=asc');
        }else
        {
            sortAsc =true;
            this.props.GetProducts('?_sort=price&_order=desc'); 
        }       
    }

    paginationHandler(value)
    {
        if(value === "Next" && pageNumber < totalPages/6)
        {
            pageNumber++;
        }
        else if(value === "Previous" && pageNumber > 1)
        {
            pageNumber--;
        }
        else if(value !== "Previous" && value !== "Next")
        {
            pageNumber = value.i;
        }
        let apiCall = '?_page='+pageNumber+'&_limit=6';
        this.props.GetProducts(apiCall);
    }

    pagination = event => 
    {  let ret =[];
        if(this.props.products?.length > 6)
        {
            totalPages = this.props.products.length/6;
        }
        for(let i = 1; i <= totalPages; i++){
            let value =i;
        ret.push(<li key={i} className="page-item"><button className={i === pageNumber ? ' page-link paginationActive' : 'page-link'} onClick={(e) => this.paginationHandler({i}, e)}>{i}</button></li>);
        }
        return ret
    }
    searchHandler = event =>
    {
        event.preventDefault();
        this.setState({
            searchText : event.target.value
        });
        this.props.GetProducts('?name_like='+this.state.searchText+'&_limit=6');
    }
     
    componentDidMount()
    {
        this.props.GetProducts(null);
        this.props.GetProducts('?_limit=6');
    }

    render()
    {
    let products  = this.props.products;
    if(products?.length === 0)
    {
        products =null;
    }
        return (
            // <UserContext.Consumer>
            <div className="container">
                <div className="container">
                <h2>Mobiles </h2>
                <div className="rightSide">
                <button className="sortButton" onClick={this.sortingClicked}><span className="glyphicon glyphicon-sort"></span></button>
                
                <form onSubmit={e => { e.preventDefault(); }} className="SearchForm">
                    <input type="text" placeholder="Search" required className="searchTextbox" value={this.state.searchText} onChange={this.searchHandler}/>
                    </form>
                </div>
                    <hr/>
                {this.state.searchText !== '' &&                
                <h4>Searching Text : {this.state.searchText}</h4>
                }
                {products !== null && products.map((product,index) => {
                    return (
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
                    );
                })}
                </div>
                {products !== null && this.state.searchText === '' &&
                <center>
                    <ul className="pagination">
                    {pageNumber !== 1 &&<li className="page-item"><button className="page-link" onClick={(e) => this.paginationHandler("Previous", e)} >Previous</button></li>}                      
                    {this.pagination()}
                    {pageNumber !== 4 &&<li className="page-item"><button className="page-link" onClick={(e) => this.paginationHandler("Next", e)}>Next</button></li> }
                    </ul>
                 </center>
                }

                 {products === null &&
                    <h4>No product found!</h4>
                 }
                 
            </div>
            // </UserContext.Consumer>
        );
    }

    componentDidUpdate()
    {
        if(this.props.products === null)
        {
            this.props.GetProducts(null);
            this.props.GetProducts('?_limit=6');
        }
    }

}

function mapStateToProps(state) {    
    return {
        products: state.ProductReducer.products
        };
    }
  
  const mapDispatchToProps = dispatch => ({
    GetProducts: (add) => dispatch(asyncProducts(add))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Product);
