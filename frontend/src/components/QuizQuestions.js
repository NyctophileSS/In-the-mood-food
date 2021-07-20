import React, {useState} from 'react';
import axios from 'axios';


function QuizQuestions(){
    return(
        <div>
            <form>
                <label>What price range are you interested in?</label>
                <input type="range" min='0' max='4'></input>
                <label>What distance are you willing to drive</label>
                <input type="range" min='1' max='25'></input>
                <label>Please select what food you are "In-The-Mood" for:</label>
                <input type="checkbox"></input>
            </form>
        </div>
    )
};

export default QuizQuestions;