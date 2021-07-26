import React from 'react';
import PageTitle from '../components/PageTitle';
import GoogleApiWrapper from '../components/GoogleMap';

const ResultsPage = () => {
    return (
        <div>
            <PageTitle />
            <GoogleApiWrapper />
        </div>
    );
};


export default ResultsPage;