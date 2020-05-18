const initialState = {
    
    isLoggedIn : false
} 

function LoginReducer (state = initialState, action)
{
    switch(action?.type){
        case "Login":
               let user = action.users.filter(user => user.username === action.username && user.password === action.password)
               localStorage.setItem('user', user);
                return state = {
                    user:user,
                    isLoggedIn : true
                }
        case "Logout":
            localStorage.setItem('user', null);
                return state = {
                    user:null,
                    isLoggedIn : false
                }
        default:
            return state;
    }
}

export default LoginReducer;
