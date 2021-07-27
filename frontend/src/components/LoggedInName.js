import React from 'react';
import '../styles.css';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
          opacity: 0.2
  },
  visible: {
          opacity: 1,
          transition: { duration: 1.5}
  },

}

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
     <motion.div id="loggedInDiv"
      variants = {containerVariants}
      initial = "hidden"
      animate = "visible"
      exit = "exit"
    
    >
      <div id="userNameDiv"><span id="userName">Logged In As {firstName} {lastName}</span></div>
      <div><motion.button 
        variants = {buttonVariants}
        whileHover = "hover"

        type="button" id="logoutButton" class="buttons" 
        onClick={doLogout}> Log Out </motion.button></div>
     </motion.div>
    );
};

export default LoggedInName;
