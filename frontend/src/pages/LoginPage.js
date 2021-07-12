import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles.css';

const LoginPage = () =>
{

    return(
      <div>
        <PageTitle />
        <Login />
        <Register />
      </div>
    );
};

export default LoginPage;
