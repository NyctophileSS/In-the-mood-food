import React, {useState} from 'react';
import '../styles.css';
// Will update with methods and API later -JMM
function Register(){
    return (
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
            {/* <Button onClick={ }>Register</Button>  */}
            {/* <span>{ }</span>  Error block ((Will update when API links)) */}
        </div>
    );
};