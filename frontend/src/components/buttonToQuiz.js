import React from 'react';
import '../styles.css';

export default function buttonToQuiz () {
    const goToQuiz = async event => {
        window.location.href = 'quiz';
    }
    return(
        <div>
            <input id="mapToQuizButton" type="button" onClick={goToQuiz}>Let's Search For Something Else!</input>
        </div> 
    )
}