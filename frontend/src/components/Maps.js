var map;
var service;
var infowindow;

// Need to get this info from quiz page
var distance = 30000;
var foodType = 'Mexican';
var userRating = 2;
var maxPrice = 1;

var lat, lng;

function initMap() {
  
  getLocation();

  var foodLocation = new google.maps.LatLng(28.60227, -81.20011);

  map = new google.maps.Map({center: foodLocation, zoom: 12});

  foodLocation = new google.maps.LatLng(lat, lng);

  // Request information to be sent to Google Maps API with quiz information
  var request = {
    query: foodType,
    location: foodLocation,
    radius: distance,
    maxPriceLevel: maxPrice,
    type: ['restaurant'],
    fields: ['photo', 'formatted_address', 'name', 'rating'],
  };

  var service = new google.maps.places.PlacesService(map);

  // Sending the request to Google Maps API
  service.textSearch(request, function(results, status) {
    
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      
      const newResults = [];

      for (var i = 0; i < results.length; i++) {

        if (results[i].rating >= userRating) {

          newResults[i] = results[i];
        }
      }

      for (var i = 0; i < results.length; i++) {
    
        createMarker(newResults[i]);
      }

      map.setCenter(foodLocation);
    }
  });
}

// Getting the User's Location then setting an info window to tell if it has been found/is supported
function getLocation() {

  infoWindow = new google.maps.InfoWindow();

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
        setUserLocation(pos.lat, pos.lng);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {

    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// Error handling with location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  
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
function setUserLocation(latitude, longitude) {

  lat = latitude;
  lng = longitude;
}

// Creating the markers on the Google Map itself with the information from results found
function createMarker(place) {
   
  if (!place.geometry || !place.geometry.location) return;

  var price = '$$$$';

  if (place.price_level == 1) {
    price = '$';
  } else if (place.price_level == 2) {
    price = '$$';
  } else if (place.price_level == 3) {
    price == '$$$';
  }

  var contentString = 
  '<h1>' + place.name + '</h1>' +
  '<p></p>' + place.formatted_address +
  '<p>Rating: ' + place.rating + ', Price Level: ' + price + '</p>';


  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  
  const marker = new google.maps.Marker({
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