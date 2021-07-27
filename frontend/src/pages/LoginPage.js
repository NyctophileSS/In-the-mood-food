import React from 'react';

import PageTitle from '../components/PageTitle';
import { LoginRegisterSwapper } from '../components/context';

const LoginPage = () =>
{

    return(
        <div>
        <PageTitle />
        <LoginRegisterSwapper/>
        </div>
    );
};

export default LoginPage;
