import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import QuizQuestions from '../components/QuizQuestions';

const QuizPage = () =>{
    return (
        <div>
            <PageTitle/>
            <LoggedInName/>
            <QuizQuestions/>
        </div>
    );
};
export default QuizPage;