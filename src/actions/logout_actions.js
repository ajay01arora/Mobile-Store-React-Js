const asyncLogout = () => {
    return function(dispatch,getState){
        dispatch({type : 'Logout'})
      }
  }
  
  
  export default asyncLogout;