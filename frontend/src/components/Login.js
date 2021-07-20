import React, { useState } from 'react';
import '../styles.css';
import firebaseApp from '../fire';

function Login()
{
    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            firebaseApp.auth().signInWithEmailAndPassword(loginName.value, loginPassword.value)
                .then((userCredential) => {
                    var user = userCredential.user;
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });

            var storage = require('../tokenStorage.js');
            var res = JSON.parse(await response.text());
            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
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
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }       
    };

    return(
    <div id="loginDiv" className="loginBlock">
        <p><input type="text" id="loginName" placeholder="Email" ref={(c) => loginName = c}></input></p>
        <p><input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}></input></p>
        <p><a onClick={doLogin}>Start munchin'</a></p>
    <span id="loginResult">{message}</span>
    </div>
    );
};

export default Login;
