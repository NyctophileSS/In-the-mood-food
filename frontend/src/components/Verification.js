import React, {useState} from 'react';
import '../styles.css';
import { motion } from "framer-motion";

const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: 5
      }
    }
  }
function Verification()
{
    var userEmail;
    var userToken;

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');

    const doVerification = async event => 
    {
        event.preventDefault();

        var obj = {email:userEmail.value, token:userToken.value};
        var js = JSON.stringify(obj);

        if (userEmail.value == "")
        {
            setMessage("Please enter an email");
            return;
        }
        else if (userToken.value == "")
        {
            setMessage("Please enter a token");
            return;
        }

        try
        {   
            const response = await fetch(bp.buildPath('api/verification'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var temp = JSON.stringify(await response.text());
            var res = JSON.parse(temp);              
            if (res.error) 
            {
                setMessage(res.error);//'could not verify user');
            }
            else 
            {
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
    <div id="verificationDiv">
        <p><input type="text" id="email" placeholder="Email" ref={(c) => userEmail = c}></input></p>
        <p><input type="text" id="token" placeholder="Token" ref={(c) => userToken = c}></input></p>
        <p><motion.button 
            variants = {buttonVariants}
            whileHover = "hover"

            type="button" id="verifyButton" onClick={doVerification}> Verify account</motion.button></p>
    <span id="verificationResult">{message}</span>
    </div>
    );
};

export default Verification;