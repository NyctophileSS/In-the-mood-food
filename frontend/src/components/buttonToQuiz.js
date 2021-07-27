import React from 'react';
import '../styles.css';
import { motion } from "framer-motion";

const buttonVariants = {
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3,
            yoyo: 5
        }
    }
}

export default function buttonToQuiz (){
    const goToQuiz = async event => {
        window.location.href = '/quiz'
    }
    return(
            <motion.button
            variants={buttonVariants}
            whileHover="hover"

            type="button" id="mapToQuizButton" onClick={goToQuiz}>Let's Search Again!</motion.button>
    );
};