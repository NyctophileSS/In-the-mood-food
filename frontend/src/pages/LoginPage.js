import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
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
