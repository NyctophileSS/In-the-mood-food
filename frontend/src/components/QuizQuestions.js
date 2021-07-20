import React, {useState} from 'react';
import axios from 'axios';



function QuizQuestions(){
    
    var priceRange; // 0-4
    var distanceRadiusMiles; // miles->meters
    var distanceRadiusMeters;
    var cuisineInput; // text input
    var rating; // Will be manually voided

    const [price,setPrice] = useState(priceRange.value);
    const [distance,setDistance] = useState(distanceRadius.value);

    const doQuizQuery = async event =>{
        // Conversion of Miles into meters for Google API
        distanceRadiusMeters = distanceRadiusMiles.value / 0.00062137; 
    }
    
    return(
        <div>
            <form>
                <label>What price range are you interested in?</label>
                <input id='price' type="range" min='0' max='4' ref={(c) => priceRange = c}></input>
                <p id='priceValue'>{price}</p>
                <label for='distance'>What distance are you willing to drive</label>
                <input id='distance' type="range" min='1' max='25' ref={(c) => distanceRadiusMiles = c}></input>
                <p id='distanceValue'>{distance} miles</p>
                <label for='cuisine'>Please provide what food you are "In-The-Mood" for:</label>
                <input id='cuisine' type="text" placeholder='Ex. "American", "Burgers", "Pasta", etc.' ref={(c) => cuisineInput = c}></input>
                <label for='rating'>Provide a preffered rating:</label>
                <select id='rating' ref={(c) => rating = c}>
                    <option value='2'>2.0 and up</option>
                    <option value='2.5'>2.5 and up</option>
                    <option value='3'>3.0 and up</option>
                    <option value='3.5'>3.5 and up</option>
                    <option value='4'>4 and up</option>
                    <option value='4.5'>4.5 and up</option>
                    <option value='5'>5.0 and up</option>
                </select>
                <a id='QuizSearch' onClick={doQuizQuery}>Search</a>
            </form>
        </div>
    )
};

export default QuizQuestions;