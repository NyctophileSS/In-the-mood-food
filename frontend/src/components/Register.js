import React, {useState} from 'react';
import '../styles.css';
// Will update with methods and API later -JMM
function Register(){
    return (
        <div className="RegisterBlock">
            <p>First Name</p>
            <input type="text" id="first"></input>
            <p>Last Name</p>
            <input type="text" id="last"></input>
            <p>Phone Number</p>
            <input type="text" id="phone"></input>
            <p>Email</p>
            <input type="text" id="email"></input>
            <p>New Password</p>
            <input type="password" id="pw"></input>
            <p>Verify Password</p>
            <input type="password" id="verifypw"></input>
        </div>
    );
};

export default Register;