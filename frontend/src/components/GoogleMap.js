import React from 'react';
import '../styles.css';
//import './Maps.js';
//import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I&callback=initMap&libraries=places&v=weekly'; 
//async;
import { Loader } from "@googlemaps/ks-api-loader";
import { Wrapper } from "@googlemaps/react-wrapper";

const loader = new Loader({

    apikey: "AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I",
    version: "weekly",
    libraries: ["places"],

});


const MyApp = () => (
    <Wrapper apikey={"AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I"}>
        <Maps.js/>
    </Wrapper>
);

loader
    .load()
    .then(() => {
        MyApp();
    })
    .catch((e) => {


    });

export default GoogleMap;