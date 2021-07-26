import React from 'react';
import '../styles.css';

function LoggedInName()
{

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

    return(
     <div id="loggedInDiv">
      <div><span id="userName">Logged In As {firstName} {lastName}</span></div>
      <div><button type="button" id="logoutButton" class="buttons" 
      onClick={doLogout}> Log Out </button></div>
     </div>
    );
};

export default LoggedInName;
