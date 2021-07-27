import React, { useState } from 'react';
import { motion } from "framer-motion";

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
export default function QuizQuestions() {

    var distanceRadiusMeters;
    var distanceRadiusMiles;
    var cuisineInput;
    var rating;
    var price;

    const doQuizQuery = async event => {
        distanceRadiusMeters = distanceRadiusMiles / 0.00062137;
        window.location.href = '/map';
    }

    return (
        <div id="questionsDiv">
            <form>
                <motion.div id="q1"
                    initial = {{opacity: 0}}
                    animate = {{opacity: 1}}
                    transition = {{delay: 0.5, duration:1.5}}
                >
                <div><label for='price'>What's your budget?</label></div>

                <div> <select id='price' ref={(c) => price = c}>
                        <option value='1'>$</option>
                        <option value='2'>$$</option>
                        <option value='3'>$$$</option>
                        <option value='4'>$$$$</option>
                    </select></div>
                </motion.div>

                <motion.div id="q2"
                      initial = {{opacity: 0}}
                      animate = {{opacity: 1}}
                      transition = {{delay: 1, duration:1.5}}
                >
                    <label for='distance'>What's your max distance?</label><div>
                    <input id='distance' type='number' min={0} max={50} step={5} 
                    ref={(c) => distanceRadiusMiles = c}></input> miles</div>
                </motion.div>

                <motion.div id="q3"
                      initial = {{opacity: 0}}
                      animate = {{opacity: 1}}
                      transition = {{delay: 1.5, duration:1.5}}
                >
                    <div><label for='cuisine'>What food d'ya want?</label></div>
                    <div><input id='cuisine' type="text" placeholder='"Burgers", etc.' ref={(c) => cuisineInput = c}></input></div>
                </motion.div>

                <motion.div id="q4"
                      initial = {{opacity: 0}}
                      animate = {{opacity: 1}}
                      transition = {{delay: 2, duration:1.5}}
                >
                    <div><label for='rating'>What's your preferred rating?</label></div>
                    <div><select id='rating' ref={(c) => rating = c}>
                        <option value='2'>2.0 and up</option>
                        <option value='2.5'>2.5 and up</option>
                        <option value='3'>3.0 and up</option>
                        <option value='3.5'>3.5 and up</option>
                        <option value='4'>4 and up</option>
                        <option value='4.5'>4.5 and up</option>
                        <option value='5'>5.0 and up</option>
                    </select></div>
                </motion.div>
                <motion.button 
                    variants = {buttonVariants}
                    whileHover = "hover"
                    type="button" id='QuizSearch' onClick={doQuizQuery}>Search</motion.button>
            </form>
        </div>
    );
}
