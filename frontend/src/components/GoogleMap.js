import React, { Component } from 'react';

const MapContainer = {
    height: '90vh',
    width: '90%',
    margin: 'auto',
    borderRadius: '0.25em'
}

var map;

// Need to get this info from quiz page
var distance = 30000;
var foodType = 'Mexican';
var userRating = 2;
var maxPrice = 4;

var lat, lng;

export default class MapDiv extends Component {
    

    componentDidMount() {

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I&libraries=places,geometry&v=weekly';
        script.id = 'gooogleMaps';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.addEventListener('load', e => { 
            this.onScriptLoad()
        })
    }

    onScriptLoad() {

        this.getLocation();

        var foodLocation = new window.google.maps.LatLng(28.60227, -81.20011);

        map = new window.google.maps.Map(document.getElementById('Map'), {center: foodLocation, zoom: 12});

        var foodLocation = new window.google.maps.LatLng(lat, lng);

        var radiusCircle = new window.google.maps.Circle({
            strokeColor: "#6a62d2",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#6a62d2",
            fillOpacity: 0.35,
            map,
            center: foodLocation,
            radius: distance,
        });

        // Request information to be sent to Google Maps API with quiz information
        var request = {
            query: foodType,
            location: foodLocation,
            radius: distance,
            maxPriceLevel: maxPrice,
            type: ['restaurant'],
            fields: ['photo', 'formatted_address', 'name', 'rating'],
        };

        var service = new window.google.maps.places.PlacesService(map);

        // Sending the request to Google Maps API
        service.textSearch(request, function(results, status) {
    
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      
                const newResults = [];

                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating >= userRating) {

                        newResults.push(results[i]);
                        console.log(newResults[i]);
                    }
                }

                for (var i = 0; i < newResults.length; i++) {
    
                    var place = newResults[i];
                    
                    if (!place.geometry || !place.geometry.location) return;
      
                    var price = '$$$$';
      
                    if (place.price_level == 1) {
                        price = '$';
                    } else if (place.price_level == 2) {
                        price = '$$';
                    } else if (place.price_level == 3) {
                        price = '$$$';
                    }
      
                    var contentString = 
                    '<h1>' + place.name + '</h1>' +
                    '<p></p>' + place.formatted_address +
                    '<p>Rating: ' + place.rating + ', Price Level: ' + price + '</p>';
      
      
                    const infowindow = new window.google.maps.InfoWindow({
                        content: contentString,
                    });
        
                    const marker = new window.google.maps.Marker({
                        map,
                        position: place.geometry.location,
                    });
        
                    marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                            shouldFocus: false,
                        });
                    });
                }

                map.setCenter(foodLocation);
            }
        });
    }
       
    getLocation() {

        var infoWindow = new window.google.maps.InfoWindow();
      
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              infoWindow.setPosition(pos);
              infoWindow.setContent("Your Location");
              infoWindow.open(map);
              map.setCenter(pos);
              this.setUserLocation(pos.lat, pos.lng);
            },
            () => {
                this.handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
      
          // Browser doesn't support Geolocation
          this.handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      
      // Error handling with location
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        
        // Setting the position of the user's current location
        infoWindow.setPosition(pos);
        
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
      
        infoWindow.open(map);
      }
      
      // Setting the global location variables
    setUserLocation(latitude, longitude) {
      
        lat = latitude;
        lng = longitude;
    }

    render() {
        return ( 
            <div style = {MapContainer}>
                <div id = "Map"/>
            </div>
        )
    }
}