// import React from "react";
// export default React.createContext();


import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  // state = {
  //   user: {},
  // }

  // // Method to update state
  // setUser = user => {
  //   this.setState(prevState => ({ user }))
  // }



  setUser = (user) => {    
    this.setState({ user });
  }

  state = {
    setUser: this.setUser,
    user: JSON.parse(JSON.stringify(localStorage.getItem("userData")))
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("context===",prevProps,prevState)
    if (this.state.user !== prevState.user) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("userData",JSON.stringify(this.state.user))
    }
  }

  render() {
    const { children } = this.props
    // const { user } = this.state
    // const { setUser } = this

    return (
      <UserContext.Provider
        value={this.state
         }
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }