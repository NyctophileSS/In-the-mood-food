import React, {useState} from 'react';

function QuizQuestions(){
    
    var distanceRadiusMiles;
    var distanceRadiusMeters;
    var cuisineInput; 
    var rating; 
    var price;
    

    const doQuizQuery = async event =>{
        
        distanceRadiusMeters = distanceRadiusMiles.value / 0.00062137; 
    }
    

    return(
        <div>
            <form>
                <label>What price range are you interested in?</label>
                <input id='price' type="range" min='0' max='4' value={price} step='1' onChange={(c) => price}></input>
                <p id='priceValue'><output for=''>0</output></p>
                <label for='distance'>What distance are you willing to drive</label>
                <input id='distance' type="range" min='5' max='30' value='5' step='5' ref={(c) => distanceRadiusMiles = c}></input>
                <p><output for='distance'>5</output> miles</p>
                <label for='cuisine'>Please provide what food you are "In-The-Mood" for:</label>
                <p><input id='cuisine' type="text" placeholder='Ex. "American", "Burgers", "Pasta", etc.' ref={(c) => cuisineInput = c}></input></p>
                <label for='rating'>Provide a preffered rating:</label>
                <p><select id='rating' ref={(c) => rating = c}>
                    <option value='2'>2.0 and up</option>
                    <option value='2.5'>2.5 and up</option>
                    <option value='3'>3.0 and up</option>
                    <option value='3.5'>3.5 and up</option>
                    <option value='4'>4 and up</option>
                    <option value='4.5'>4.5 and up</option>
                    <option value='5'>5.0 and up</option>
                </select></p>
                <a id='QuizSearch' onClick={doQuizQuery}>Search</a>
            </form>
        </div>
    )
};

export default QuizQuestions;