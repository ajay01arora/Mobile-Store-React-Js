import React from 'react';
import { connect } from "react-redux";
import  asyncProducts from "../actions/products";

let sortAsc = true;

function ProductList(props) 
{    
    function sortingClicked()
    {
        if(sortAsc)
        {
            sortAsc = false;
            props.product('?_sort=price&_order=asc');
        }else
        {
            sortAsc =true;
            props.product('?_sort=price&_order=desc'); 
        }       
    }
       
    let posts  = props.products;
    if (posts != null && posts.length > 0) {
        return (
            
            <div className="container">
                <div className="container">
                <h2>Mobiles</h2>
                <div className="rightSide">
                <button className="sortButton" onClick={sortingClicked}><span className="glyphicon glyphicon-sort"></span></button>
                <span className="searchBox">
                    <form>
                    <input type="text" placeholder="Search" name="search" />
                    </form>
                </span>
                </div>
                    <hr/>
                {posts.map(post => {
                    return (
                        <div className="col-md-4">
                            <div className="card">
                                <center>
                                <div className="card-header">
                                    <img src={post.image} alt={post.name} height="200px" />
                                </div>
                                <div className="card-body">
                                    
                                    <h3>{post.name}</h3>                                   
                                   <h4> ₹ {post.price} </h4>
                                </div>
                                <div className="card-footer">
                                    <button className="ViewButton btn-primary">View</button>{'       '}
                                    <button className="btn-danger">Add to Cart</button>
                                </div>
                                </center>
                            </div>
                        </div>
                    );
                })}
                </div>
                
                    <Pagination length={posts.length} />
                 
            </div>
        );
    }
    else {
        return (
            <div className="Posts">
                No Posts Found
            </div>
        );
    }

}

export function Pagination(props)
{

    return(
        <center>
         <ul className="pagination">
        <li className="page-item"><button className="page-link" >Previous</button></li>
                        
        <li className="page-item"><button className="page-link" >1</button></li>
        <li className="page-item"><button className="page-link" >2</button></li>
        <li className="page-item"><button className="page-link" >3</button></li>
        <li className="page-item"><button className="page-link" >Next</button></li>
        </ul>
        </center>
    );
}


function mapStateToProps(state) {
    return {
      products: state.ProductReducer.products
    };
  }
  
  const mapDispatchToProps = dispatch => ({
    product: (add) => dispatch(asyncProducts(add))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
