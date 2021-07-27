import React from 'react';
import PageTitle from '../components/PageTitle';
import MapDiv from '../components/GoogleMap';
import buttonToQuiz from '../components/buttonToQuiz';

const ResultsPage = () => {
    return (
        <div>
            <PageTitle />
            <buttonToQuiz />
            <MapDiv />
        </div>
        
    );
};


export default ResultsPage;