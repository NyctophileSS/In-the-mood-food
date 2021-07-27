import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

//This is as far I have gotten successfully atm. If I am asleep, continue from here.
//const TestMarker = ({ text, lat, lng }) => <div lat={lat} lng={lng}>{text}</div>;


const foundMarkers = [];

const MapContainer = {
    height: '80vh',
    width: '100%',
}
const markColor = {
    background : 'red'
}

const newResults = [];
const rating = 4;

export default class MapDiv extends Component {
    

    handleSearch = ((map, mapsApi) => {
        const placesService = new mapsApi.places.PlacesService(map)
        var foundMarker = { name: {}, lat: {}, lng: {}, photos: {}, rating: {}, price: {}, address: {} }
        const placesRequest = {
            location: new mapsApi.LatLng(28.5986, -81.1986),
            query: 'burger',
            radius: 30000,
            maxPriceLevel: 4,
            type: ['restaurant'],
            fields: ['photo', 'formatted_address', 'name', 'rating']
        };

        placesService.textSearch(placesRequest, ((results) => {
            for (let i = 0; i < results.length; i++) {
                if (results[i].rating >= rating) {
                    newResults.push(results[i]);
                }
            }
            for(let i = 0; i < newResults.length; i++){
                foundMarker.name = newResults[i].name;
                foundMarker.lat = newResults[i].geometry.location.lat;
                foundMarker.lng = newResults[i].geometry.location.lng;
                foundMarker.photos = newResults[i].photos;
                foundMarker.rating = newResults[i].rating;
                foundMarker.price = newResults[i].price_level;
                foundMarker.address = newResults[i].formatted_address;
                foundMarkers.push(foundMarker);
                console.log(foundMarkers);
            }
            
        })
        );
    });


    render() {
        const TestMarker = ({ text, lat, lng}) => <div lat={lat} lng={lng}>{text}</div>;
        return (
            <div style={MapContainer} >
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I',
                        libraries: ['places']
                    }} 
                    defaultZoom={12}
                    defaultCenter={{ lat: 28.5986, lng: -81.1986 }}
                    yesIWantToUseMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.handleSearch(map, maps) } >
                       <TestMarker
                        lat={28.5986}
                        lng={-81.1986}
                        text={"End my suffering"}/>
                </GoogleMapReact>
            </div>
        );
    };
};