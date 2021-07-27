import React from 'react';
import '../styles.css';
import { motion } from 'framer-motion';


const buttonVariants = {
  hover: {
    scale: 1.1,

    transition: {
      duration: 0.3,
      yoyo: 5
    }
  }
}

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
      <div id="userNameDiv"><span id="userName">Logged In As {firstName} {lastName}</span></div>
      <div><motion.button 
        variants = {buttonVariants}
        whileHover = "hover"

        type="button" id="logoutButton" class="buttons" 
        onClick={doLogout}> Log Out </motion.button></div>
     </div>
    );
};

export default LoggedInName;
