import React, {useState, useContext} from 'react';
import '../styles.css';
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {
            opacity: 0.2
    },
    visible: {
            opacity: 1,
            transition: { duration: 1.5}
    },
 
}

function Verification()
{
    var email;
    var token;

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');

    const doVerification = async event => 
    {
        event.preventDefault();

        var obj = {email:email, token:token};
        var js = JSON.stringify(obj);

        try
        {   
            const response = await fetch(bp.buildPath('api/verification'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var storage = require('../tokenStorage.js');
            var res = JSON.parse(await response.text());              
            if (res.error) 
            {
                setMessage(res.error);//'could not verify user');
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
                // window.location.href = '/';    // TODO: formalize where to redirect after registering
            }

        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
    <motion.div id="verificationDiv" className="verificationBlock"
        variants = {containerVariants}
        initial = "hidden"
        animate = "visible"
        exit = "exit"
    >
        <p><input type="text" id="email" placeholder="Email" ref={(c) => email = c}></input></p>
        <p><input type="text" id="token" placeholder="token" ref={(c) => token = c}></input></p>
        <p><button type="button" id="verificationButton" onClick={doVerification}> Verify account</button></p>
        
    <span id="verificationResult">{message}</span>
     
    </motion.div>
    );
};

export default Verification;