import React from 'react';
import '../styles.css';
import './Maps.js';
import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I&callback=initMap&libraries=places&v=weekly'; 
//async;

function GoogleMap (){
    return(
        <div id='Map'>

        </div>
        
    );
};

export default GoogleMap;