import React, { useState } from "react";
import Login from './Login';
import Register from './Register';

import { AccountContext } from './accountContext';


export function LoginRegisterSwapper(props) {

  const [active, setActive] = useState("signin");


  const switchToSignup = () => {
    setActive("signup") ;
  
  }; 

  const switchToSignin = () => {
    setActive("signin");
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
          {active === "signin" && <Login />}
          {active === "signup" && <Register />}
    </AccountContext.Provider>
  ); 
}
