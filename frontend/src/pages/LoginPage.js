import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Register from '../components/Register';
import LoginRegisterSwapper from '../components/LoginRegisterSwapper';
import '../styles.css';

const LoginPage = () =>
{

    return(
        <div>
        <PageTitle />
        {/* <LoginRegisterSwapper /> */}
        <Login />
        <Register />
        </div>
    );
};

export default LoginPage;
