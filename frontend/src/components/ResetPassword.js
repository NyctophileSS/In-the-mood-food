import React, {useState} from 'react';

function ResetPassword()
{
    var userEmail;
    var userNewPassword1;
    var userNewPassword2;
    var userToken;

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');

    const doResetPassword = async event => 
    {
        event.preventDefault();

        var obj = {email:userEmail.value, newPassword:userNewPassword1.value, 
                    passwordToken:userToken.value};
        var js = JSON.stringify(obj);

        if (userEmail.value == "")
        {
            setMessage("Please enter an email");
            return;
        }
        if (userNewPassword1.value == "")
        {
            setMessage("Please enter a new password");
            return;
        }
        else if (userNewPassword1.value != userNewPassword2.value)
        {
            setMessage("Please ensure the passwords match");
            return;
        }
        else if (userToken.value == "")
        {
            setMessage("Please enter a token");
            return;
        }

        try
        {   
            const response = await fetch(bp.buildPath('api/reset-password'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var storage = require('../tokenStorage.js');
            var temp = JSON.stringify(await response.text())
            var res = JSON.parse(temp);              
            if (res.error) 
            {
                setMessage(res.error);//'could not verify user');
            }
            else 
            {
                setMessage("Password has been changed");
                storage.storeToken(res);
                // var jwt = require('jsonwebtoken');

                // var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                // var userId = ud.payload.userId;
                // var firstName = ud.payload.firstName;
                // var lastName = ud.payload.lastName;
              
                // var user = {firstName:firstName,lastName:lastName,id:userId}
                // localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/';
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
        <p><input type="email" id="email" placeholder="Enter your email" ref={(c) => userEmail = c}></input></p>
        <p><input type="password" id="userNewPassword1" placeholder="Enter new password" ref={(c) => userNewPassword1 = c}></input></p>
        <p><input type="password" id="userNewPassword2" placeholder="Re-enter new password" ref={(c) => userNewPassword2 = c}></input></p>
        <p><input type="text" id="userToken" placeholder="Enter token" ref={(c) => userToken = c}></input></p>
        <p><button type="button" id="forgotPasswordButton" onClick={doResetPassword}> Reset your password</button></p>
    <span id="verificationResult">{message}</span>
    </div>
    );
};

export default ResetPassword;