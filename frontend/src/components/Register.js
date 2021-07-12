import React, {useState} from 'react';
import '../styles.css';

function Register()
{
    var fn;
    var ln;
    var loginName;
    var loginPassword1;
    var loginPassword2;
    var loginPhoneNumber;

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const doRegister = async event =>
    {
        event.preventDefault();

        var obj = {firstName:fn.value, lastName:ln.value, 
                    login:loginName.value,password:loginPassword1.value, 
                    phoneNumber:loginPhoneNumber.value};

        if(loginPassword1.localeCompare(loginPassword2) != 0){
            setMessage("These passwords don't match. Please Try again.");
            return;
        }
                    
        try
        {    
            const response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var storage = require('../tokenStorage.js');
            var res = JSON.parse(await response.text());              
            if (res.error) 
            {
                setMessage(res.error);//'Error creating user account');
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
                window.location.href = '/cards';    // TODO: formalize where to redirect after registering
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }      
    };

    return (
        <div className="registerDiv">
            <p>First Name</p>
            <input type="text" id="first" ref={(c) => fn = c}></input>
            <p>Last Name</p>
            <input type="text" id="last"  ref={(c) => ln = c}></input>
            <p>Phone Number</p>
            <input type="text" id="phone"  ref={(c) => loginPhoneNumber = c}></input>
            <p>Email</p>
            <input type="text" id="email" ref={(c) => loginName = c}></input>
            <p>New Password</p>
            <input type="password" id="pw" ref={(c) => loginPassword1 = c}></input>
            <p>Verify Password</p>
            <input type="password" id="verifypw" ref={(c) => loginPassword2 = c}></input>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;