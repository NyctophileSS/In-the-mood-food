import React from 'react';
import PageTitle from '../components/PageTitle';
import MapDiv from '../components/GoogleMap';
import GoogleMapReact from 'google-map-react';

const ResultsPage = () => {
    return (
        <div>
            <PageTitle />
            <MapDiv />
            <input type="button" onClick={() => window.location.href = '/quiz'}></input>
        </div>
        
    );
};


export default ResultsPage;