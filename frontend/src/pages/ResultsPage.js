import React from 'react';
import PageTitle from '../components/PageTitle';
import MapDiv from '../components/GoogleMap';
import ButtonToQuiz from '../components/buttonToQuiz';

const ResultsPage = () => {
    return (
        <div>
            <PageTitle />
            <ButtonToQuiz />
            <MapDiv />
        </div>
        
    );
};


export default ResultsPage;