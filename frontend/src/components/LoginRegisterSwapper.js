import React, { useState } from 'react';
import axios from 'axios'
import '../styles.css';
import Login from './Login';
import Register from './Register';

function LoginRegisterSwapper()
{
    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const switchToRegister = async event =>
    {
        return;
    }

    const switchToLogin = async event => {
        return;
    }

    return(
    <div id="loginRegisterSwapper" className="loginBlock">
        <a onClick={switchToLogin}>Login</a><a onClick={switchToRegister}>Signup</a>
    </div>
    );
};

export default LoginRegisterSwapper;
