import React, { useState } from 'react';
import axios from 'axios'
import '../styles.css';
import Register from './Register';

function Login()
{
    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const switchToRegister = async event =>
    {
        return;
    }
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
        <p id="inner-title">Login Below</p>
        <input type="text" id="loginName" placeholder="Email" ref={(c) => loginName = c}/>
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}/><br></br>
        <a onClick={doLogin}>Login</a><br></br>
        <a onClick={switchToRegister}>Need an Account?</a><br></br>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
