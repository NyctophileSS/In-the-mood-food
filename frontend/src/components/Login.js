import React, { useState } from 'react';

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
                setMessage(res.error);//'User/Password combination incorrect');
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
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br/>
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br/>
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form><br/>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
