import React from 'react';
import PageTitle from '../components/PageTitle';
import MapDiv from '../components/GoogleMap';
import GoogleMapReact from 'google-map-react';
import buttonToQuiz from '../components/buttonToQuiz';

const ResultsPage = () => {
    return (
        <div>
            <PageTitle />
            <MapDiv />
            <buttonToQuiz />
        </div>
        
    );
};


export default ResultsPage;