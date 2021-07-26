import React from 'react';
import PageTitle from '../components/PageTitle';
import MapDiv from '../components/GoogleMap';
import GoogleMapReact from 'google-map-react';

const ResultsPage = () => {
    return (
        <div>
            <PageTitle />
            <MapDiv />
        </div>
    );
};


export default ResultsPage;