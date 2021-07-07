import React, { Component, useState } from 'react';
import {Text, View, Button, Link} from 'react-native';
// import '.css';

function loginAPI(){
}
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