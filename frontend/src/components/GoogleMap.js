import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../styles.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

const ourLatLng = {  lat: 280.60227, lng: -81.2001 };

export default class MapDiv extends Component {
    constructor(props){
        super(props);
        this.state={
            map : { },
            mapsApi : { },
            placesService : mapsApi.places.PlacesService(map),
            currentLatLng: {},
            searchResults: []
        };
    }
    apiHasBeenCalled = ((map,mapsApi) => {
        this.setState= ({
            map,
            maps,
        })
        this.handleSearch()
    })

    handleSearch = (() => {
        const { mapsApi, placesService } = this.state;
        const newResults = [];

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
        this.setState({ searchResults: newResults })
    });

    render() {
        const Markers = this.state.searchResults.map( d => {
            <Marker 
                key = {d.id}
                lat = {d.lat}
                lng = {d.lng}
                text = {d.name}
                fontColor = {blue}
            />
            
        })
        return (
            <div height='70rem' width='70rem'>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        //key: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I&callback=initMap&libraries=places&v=weekly",
                        key: 'AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I',
                        libraries: ['places']
                    }} defaultZoom={12}
                    defaultCenter={{ lat: 280.60227, lng: -81.20011 }}
                    yesIWantToUseMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasBeenCalled(map, maps) } >
                        {Markers}
                </GoogleMapReact>
            </div>
        );
    };
};