const initialState = {
    users: [
        {   
            user_id : 1,
            username : "ajay",
            password : "ajay@12345",            
        },
        {
            user_id:2,
            username: "rahul",
            password: "rahul@12345"
        }
    ],
    isLoggedIn : false
} 

function LoginReducer (state = initialState, action)
{
    switch(action?.type){
        case "Login":
               let user = state.users.filter(user => user.username === action.username && user.password === action.password)
               user.isLoggedIn = true;
               localStorage.setItem('user', user);
               return user;
        case "Logout":
                user.isLoggedIn = false;
                localStorage.setItem('user','');
                return user;
        default:
            return state;
    }
}

export default LoginReducer;
