import React, { Component, useState } from 'react';
import {Text, View, Button, Link} from 'react-native';
// import '.css';

const MongoClient = require('mongodb').MongoClient;
const test = require('assert');

// Connection url (will most likely change)
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'COP4331';

// Connect using MongoClient
MongoClient.connect(url, function(err, client) {

    // Use the admin database for the operation
    const adminDb = client.db(dbName).admin();

    client.close();
    
});

function loginAPI(){
    const doLogin = async event =>
    {
        event.preventDefault();

        alert('doIt()');
    };

    return (
        <div id="loginDiv">
            <form onSubmit={doLogin}>
            <span id="inner-title">PLEASE LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username" /><br />
            <input type="password" id="loginPassword" placeholder="Password" /><br />
            <input type="submit" id="loginButton" class="buttons" value = "Do It" onClick={doLogin} />
            </form>
            <span id="loginResult"></span>
        </div>
    );
};

function blockSwitch(){
}

function registerAPI(){
}

class App extends Component(){ 
    render() {
        return (
            <View>
                <div className="loginBlock">
                    <Text>Login</Text><br/>
                    <Text>Username</Text>
                    <input type="text"></input>
                    <Text>Password</Text>
                    <input type="password"></input>
                    <Button onClick={}>Login</Button>   
                    <span>{}</span> // Error block ((Will update when API links))
                </div>
                <div className="RegisterBlock">
                    <Text>First Name</Text>
                    <input type="text" id="first"></input>
                    <Text>Last Name</Text>
                    <input type="text" id="last"></input>
                    <Text>Phone Number</Text>
                    <input type="text" id="phone"></input>
                    <Text>Email</Text>
                    <input type="text" id="email"></input>
                    <Text>New Password</Text>
                    <input type="password" id="pw"></input>
                    <Text>Verify Password</Text>
                    <input type="password" id="verifypw"></input>
                    <Button onClick={}>Register</Button>
                    <span>{}</span> // Error block ((Will update when API links))
                </div>
            </View>
        );
    }
}

export default App;
