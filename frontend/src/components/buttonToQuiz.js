import React from 'react';

export default function buttonToQuiz (){
    const goToQuiz = async event => {
        window.location.href = '/quiz'
    }
    return(
        <input id="mapToQuizButton" type="button" onClick={goToQuiz}>Let's Search For Something Else!</input>
    );
};