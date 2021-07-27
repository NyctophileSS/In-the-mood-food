import React from 'react';
import '../styles.css';
import { motion } from 'framer-motion';

function PageTitle()
{
   return(
     <motion.h1 id="title"
        initial={{ y: -250}}
        animate={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 50 }}
        >
                In-The-Mood Food
    </motion.h1>   
   );
};

// function PageTitle()
// {
//    return(
//      <h1 id="title">In-The-Mood Food</h1>
//    );
// };

export default PageTitle;
