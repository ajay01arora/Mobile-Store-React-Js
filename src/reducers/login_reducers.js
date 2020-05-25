const initialState = {
    
    isLoggedIn : false
} 

function LoginReducer (state = initialState, action)
{
    switch(action?.type){
        case "Login":
               if(action.login.length > 0)
               {
                   let user = action.login[0];
                    localStorage.setItem('user',JSON.stringify(user));                    
                    return state = 
                    {
                        isLoggedIn : true,
                        error : false
                    }                    
               }
               else
                {
                    return state = 
                    {
                        isLoggedIn : false,
                        error : true
                    }
                }
        case "Logout":
             localStorage.removeItem('user');
                return state = {
                    isLoggedIn : false,
                    error : false
                }
        default:
            let user = localStorage.getItem('user');
            if(user !== null)
            {
                return state = 
                {
                    isLoggedIn : true,
                    error : false
                }                    
           }
           else
            {
                return state = 
                {
                    isLoggedIn : false,
                    error : false
                }
            }
            
    }
}

export default LoginReducer;
