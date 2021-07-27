import React, {useState} from 'react';
import '../styles.css';
import { motion } from 'framer-motion';

function ForgotPassword()
{
    var userEmail;

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');

    const doForgotPassword = async event => 
    {
        event.preventDefault();

        var obj = {email:userEmail.value};
        var js = JSON.stringify(obj);

        if (userEmail.value == "")
        {
            setMessage("Please enter an email");
            return;
        }

        try
        {   
            const response = await fetch(bp.buildPath('api/forgot-password'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var storage = require('../tokenStorage.js');
            var temp = JSON.stringify(await response.text());
            var res = JSON.parse(temp);              
            if (res.error) 
            {
                setMessage(res.error);//'could not verify user');
            }
            else 
            {
                setMessage("an email has been sent to the specified address with instructions on how to reset your password");
                storage.storeToken(res);
                // var jwt = require('jsonwebtoken');

                // var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                // var userId = ud.payload.userId;
                // var firstName = ud.payload.firstName;
                // var lastName = ud.payload.lastName;
              
                // var user = {firstName:firstName,lastName:lastName,id:userId}
                // localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/reset-password';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
    <div>
        <p><input type="text" id="email" placeholder="Enter email to send reset link" ref={(c) => userEmail = c}></input></p>
        <p><motion.button 
            whileHover ={{
                opacity: 0.5  
            }}
            type="button" id="forgotPasswordButton" onClick={doForgotPassword}> Send a reset password email</motion.button></p>
    <span id="verificationResult">{message}</span>
    </div>
    );
};

export default ForgotPassword;