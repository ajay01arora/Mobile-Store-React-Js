export const Login = "Login";


export function login(username, password) {
  const action = {
    type: Login,
    username : username,
    password: password
  };
  return action;
}

export function logout() {
  const action = {
    type: "Logout"    
  };
  return action;
}
