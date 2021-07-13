import React, { useState } from 'react';
import axios from 'axios'
import '../styles.css';

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
      <div id="loginDiv">
        <span id="inner-title">Please Login Below</span><br></br>
        <input type="text" id="loginName" placeholder="Email" ref={(c) => loginName = c}/><br></br>
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}/><br></br>
        <button type="button" onClick={doLogin}>Login</button><br></br>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
