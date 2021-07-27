import React, { useState, useContext} from 'react';
import { motion } from "framer-motion";
import {AccountContext} from "./accountContext";


function Login()
{
    var loginName;
    var loginPassword;
     
    const { switchToSignup } = useContext(AccountContext); 

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value, password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var storage = require('../tokenStorage.js');
            var res = JSON.parse(await response.text());
            if (res.error == "Login/Password incorrect") 
            {
                setMessage('User/Password combination incorrect');
            }
            else if (res.error == "account has not been verified")
            {
                setMessage('This account has not yet been verified');
            }
            else 
            {	
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
    
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                  
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/quiz';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }       
    };

    const forgotPw = async event =>{
        window.location.href = '/forgot-password';
    }
     
    return(
    <motion.div id="loginDiv" className="loginBlock" >
        <p><input type="text" id="loginName" placeholder="Email" ref={(c) => loginName = c}></input></p>
        <p><input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}></input></p>
        <p><button type="button" id="loginButton" onClick={doLogin}> Start munchin'</button></p>
        <p><a id="forgotPassword" onClick={forgotPw} cursor="pointer">Forgot password?</a></p>
        <p href = "#" > Don't have an account? {" "}
            <a href = "#" onClick = {switchToSignup} > Signup</a>
        </p>
        
    <span id="loginResult">{message}</span>
     
    </motion.div>
    );
};

export default Login;
