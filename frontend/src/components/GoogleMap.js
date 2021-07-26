import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';



const mapStyles = {
    width: '100%',
    height: '100%'
};

const ourLatLng = {  lat: 28.5986, lng: -81.1986 };

const MapContainer = {
    height: '80vh',
    width: '80%',
}
const markColor = {
    background : 'red'
}

const newResults = [];

export default class MapDiv extends Component {
    
    

    handleSearch = ((map, mapsApi) => {
        const placesService = new mapsApi.places.PlacesService(map)
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
                console.log(results[i]);
                const rating = results[i].rating;
                if (results[i].rating >= placesRequest.rating) {
                    newResults.push(results[i]);
                }
            }
        })
        );
    });


    render() {
        const AnyReactComponent = ({markers}) => (
            markers.map(item => (
                <div lat={item.geometry.location.lat} lng ={item.geometry.location.lng}>{item.name}</div>
            ))
        );
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
                       <AnyReactComponent
                            markers={newResults}
                       ></AnyReactComponent>
                </GoogleMapReact>
            </div>
        );
    };
};