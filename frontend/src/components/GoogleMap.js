import React from 'react';
import GoogleMapReact from 'google-maps-react';
import '../styles.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

class MapDiv extends React.Component() {
    handleSearch = (() => {
        const { mapsApi, placesService } = this.state;
        const newResults = [];

        const placesRequest = {
            location: new mapsApi.LatLng(280.60227, -81.2001),
            query: '',
            radius: 30000,
            maxPriceLevel: 1,
            type: ['restaurant'],
            fields: ['photo', 'formatted_address', 'name', 'rating']
        };

        placesService.textSearch(placesRequest, ((results) => {
            for (let i = 0; i < results.length; i++) {
                const rating = results[i].rating;
                if (results[i].rating >= placesRequest.maxPriceLevel) {
                    newResults.push(results[i]);
                }
            }
        })
        );
        this.setState({ searchResults: newResults })
    });

    render() {
        return (
            <div height='35rem' width='100%'>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I&callback=initMap&libraries=places&v=weekly",
                        libraries: ['places']
                    }}>
                    defaultZoom={12}
                    defaultCenter={{ lat: 280.60227, lng: -81.20011 }}
                    yesIWantToUseMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                </GoogleMapReact>
            </div>
        );
    };
};

export default GoogleApiWrapper({
    apiKey: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I&callback=initMap&libraries=places&v=weekly'
})(MapDiv);