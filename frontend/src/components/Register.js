import React, {useState} from 'react'

function Register()
{
    var fn;
    var ln;
    var loginName;
    var loginPassword;
    var loginPhoneNumber;
    
    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const doRegister = async event =>
    {
        event.preventDefault();

        var obj = {firstName:fn.value, lastName:ln.value, 
                    login:loginName.value,password:loginPassword.value, 
                    phoneNumber:loginPhoneNumber.value};
        // TODO: Continue here after api.js is updated
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
        <div className="RegisterBlock">
            <Text>First Name</Text>
            <input type="text" id="first"></input>
            <Text>Last Name</Text>
            <input type="text" id="last"></input>
            <Text>Phone Number</Text>
            <input type="text" id="phone"></input>
            <Text>Email</Text>
            <input type="text" id="email"></input>
            <Text>New Password</Text>
            <input type="password" id="pw"></input>
            <Text>Verify Password</Text>
            <input type="password" id="verifypw"></input>
            <Button onClick={ }>Register</Button>
            <span>{ }</span> // Error block ((Will update when API links))
        </div>
    );
};

export default Register;