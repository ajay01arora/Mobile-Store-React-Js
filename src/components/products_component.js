import React, {useState, useEffect, useContext } from 'react';
import { connect } from "react-redux";
import  asyncProducts from "../actions/products_actions";
import {Link} from "react-router-dom";
import AddToCartComponent from './addtocart_component';
import UserContext from '../context/userContext';

let sortAsc = true;
let pageNumber = 1;
let totalPages =0;

function ProductList(props) 
{    
    const [searchText, setText] = useState('');
    const user = useContext(UserContext)
    console.log("context",user)
    
    useEffect(() => {
        let post = props;
        post.GetProducts('?_limit=6');
    }, []);

    function sortingClicked()
    {
        if(sortAsc)
        {
            sortAsc = false;
            props.GetProducts('?_sort=price&_order=asc');
        }else
        {
            sortAsc =true;
            props.GetProducts('?_sort=price&_order=desc'); 
        }       
    }

    function paginationHandler(value)
    {
        if(value === "Next" && pageNumber < 4)
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
        props.GetProducts(apiCall);
    }

    function pagination() 
    {  let ret =[];
        if(props.products.length > 6)
        {
            totalPages = props.products.length/6;
        }
        for(let i = 1; i <= totalPages; i++){
            let value =i;
        ret.push(<li key={i} className="page-item"><button className={i === pageNumber ? ' page-link paginationActive' : 'page-link'} onClick={(e) => paginationHandler({i}, e)}>{i}</button></li>);
        }
        return ret
    }
    function searchHandler(event)
    {
        event.preventDefault();
        setText(event.target.value);
        props.GetProducts('?name_like='+searchText+'&_limit=6');
    }
       
    let posts  = props.products;
    if (posts != null && posts.length > 0) {
       
        return (
            // <UserContext.Consumer>
            <div className="container">
                <div className="container">
                <h2>Mobiles </h2>
                <div className="rightSide">
                <button className="sortButton" onClick={sortingClicked}><span className="glyphicon glyphicon-sort"></span></button>
                
                <form onSubmit={e => { e.preventDefault(); }} className="SearchForm">
                    <input type="text" placeholder="Search" required name="search" value={searchText} onChange={searchHandler}/>
                    </form>
                </div>
                    <hr/>
                {posts.map((post,index) => {
                    return (
                        <div className="col-md-4" key={index}>
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
                                <Link to={{pathname:'/product/'+post.id ,post:post}}><button className="ViewButton btn-primary">View</button></Link>
                                
                                {'       '}
                                    <AddToCartComponent post_id={post.id} />
                                </div>
                                </center>
                            </div>
                        </div>
                    );
                })}
                </div>
                <center>
                    <ul className="pagination">
                    {pageNumber !== 1 &&<li className="page-item"><button className="page-link" onClick={(e) => paginationHandler("Previous", e)} >Previous</button></li>}                      
                    {pagination()}
                    {pageNumber !== 4 &&<li className="page-item"><button className="page-link" onClick={(e) => paginationHandler("Next", e)}>Next</button></li> }
                    </ul>
                 </center>
                 
            </div>
            // </UserContext.Consumer>
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

function mapStateToProps(state) {    
    return {
        products: state.ProductReducer.products
        };
    }
  
  const mapDispatchToProps = dispatch => ({
    GetProducts: (add) => dispatch(asyncProducts(add))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
