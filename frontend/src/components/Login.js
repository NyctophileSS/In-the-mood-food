import firebaseApp from '../fire';
import React, { useState, useContext} from 'react';
import axios from 'axios'
import '../styles.css';
import { motion } from "framer-motion";
import {AccountContext} from "./accountContext";

const containerVariants = {
    hidden: {
            opacity: 0.2
    },
    visible: {
            opacity: 1,
            transition: { duration: 1.5}
    },
 
}

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

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // firebaseApp.auth().signInWithEmailAndPassword(loginName.value, loginPassword.value)
            //     .then((userCredential) => {
            //         var user = userCredential.user;
            //     })
            //     .catch((error) => {
            //         var errorCode = error.code;
            //         var errorMessage = error.message;
            //     });

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
     
    return(
    <motion.div id="loginDiv" className="loginBlock"
        variants = {containerVariants}
        initial = "hidden"
        animate = "visible"
        exit = "exit"
    >
        <p><input type="text" id="loginName" placeholder="Email" ref={(c) => loginName = c}></input></p>
        <p><input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}></input></p>
        <p><a onClick={doLogin}>Start munchin'</a></p>
        <p href = "#" > Don't have an account? {" "}
            <a href = "#" onClick = {switchToSignup}> Signup</a>
        </p>
        <p id='forgotPwLink'>Forgot password?</p>
    <span id="loginResult">{message}</span>
     
    </motion.div>
    );
};

export default Login;
