import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../styles.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

const ourLatLng = {  lat: 280.60227, lng: -81.2001 };


export default class MapDiv extends Component {
    
    

    handleSearch = ((map, mapsApi) => {
        
        const newResults = [];
        const markers = [];
        const placesService = new mapsApi.places.PlacesService(map)
        const placesRequest = {
            location: new mapsApi.LatLng(280.60227, -81.2001),
            query: 'burger',
            radius: 30000,
            maxPriceLevel: 1,
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
        for (let i = 0; i < newResults.length; i++){
            markers.push = new mapsApi.Marker({
                position: newResults[i].geometry.location,
                map,
                title: newResults[i].name
            }) 
        }
        return markers;
    });


    render() {
        
        return (
            <div height='70rem' width='70rem'>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I',
                        libraries: ['places']
                    }} defaultZoom={12}
                    defaultCenter={{ lat: 280.60227, lng: -81.20011 }}
                    yesIWantToUseMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.handleSearch(map, maps) } >
                </GoogleMapReact>
            </div>
        );
    };
};