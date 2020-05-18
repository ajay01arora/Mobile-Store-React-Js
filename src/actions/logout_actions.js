
const asyncLogout = () => {
    return dispatch=>{       
      return new Promise(resolve => {
       setTimeout(() => {
       resolve(true);
     return dispatch({type : 'Logout'})
    }, 500);
    
  });
      }
  }
  export default asyncLogout;