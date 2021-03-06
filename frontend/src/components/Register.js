import React, {useState, useContext} from 'react';
import '../styles.css';
import {AccountContext} from "./accountContext";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {
            opacity: 0.2
    },
    visible: {
            opacity: 1,
            transition: { duration: 1.5}
    },
    exit: {
        x: '-100vw',
        transition: { ease: 'easeInOut'}
    }
}
const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: 5
      }
    }
  }
function Register()
{
    var fn;
    var ln;
    var loginName;
    var loginPassword1;
    var loginPassword2;
    var loginPhoneNumber;

    
    const { switchToSignin } = useContext(AccountContext);

    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const doRegister = async event =>
    {
        event.preventDefault();

        var obj = {firstName:fn.value, lastName:ln.value, 
                    login:loginName.value, password:loginPassword1.value, 
                    phoneNumber:loginPhoneNumber.value};
        var js = JSON.stringify(obj);

        if(loginPassword1.value != loginPassword2.value){
            setMessage("These passwords don't match. Please Try again.");
            return;
        }
        else if(loginPassword1.value == ""){
            setMessage("Please enter a Password");
            return;
        }
        else if(loginPassword1.value == ""){
            setMessage("Please verify your Password.");
            return;
        }
        else if(fn.value == ""){
            setMessage("Please enter a First Name.");
            return;
        }
        else if(ln.value == ""){
            setMessage("Please enter a Last Name.");
            return;
        }
        else if(loginName.value == ""){
            setMessage("Please enter an Email.");
            return;
        }
        else if(loginPhoneNumber.value == ""){
            setMessage("Please enter a Phone Number.");
            return;
        }
                    
        try
        {   
            const response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var storage = require('../tokenStorage.js');
            var temp = JSON.stringify(await response.text())
            var res = JSON.parse(temp);
            if (res.error) 
            {
                setMessage(res.error);//'Error creating user account');
            }
            else 
            {
                window.location.href = '/verification';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }      
    };

    return (
        <motion.div id="registerDiv" className="registerBlock"
            variants = {containerVariants}
            initial = "hidden"
            animate = "visible"
            exit = "exit"
        >
            <p><input type="text" id="first" placeholder="First Name" ref={(c) => fn = c}></input></p>
            <p><input type="text" id="last"  placeholder="Last Name" ref={(c) => ln = c}></input></p>
            <p><input type="text" id="phone" placeholder="Phone Number" ref={(c) => loginPhoneNumber = c}></input></p>
            <p><input type="text" id="email" placeholder="Email" ref={(c) => loginName = c}></input></p>
            <p><input type="password" id="pw" placeholder="Password" ref={(c) => loginPassword1 = c}></input></p>
            <p><input type="password" id="verifypw" placeholder="Retype Password" ref={(c) => loginPassword2 = c}></input></p>
            <p><motion.button 
                variants = {buttonVariants}
                whileHover = "hover"

                type="button" id="registerButton" onClick={doRegister}>Register</motion.button></p>
            <p href = "#" > Don't have an account? {" "}
                <a href = "#" onClick = {switchToSignin}> Login</a>
            </p>
            <span id="registerResult">{message}</span>
        </motion.div>
    );
};

export default Register;
