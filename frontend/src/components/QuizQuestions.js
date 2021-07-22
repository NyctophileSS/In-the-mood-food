import React, {useState} from 'react';
import InputRange from 'react-input-range';


export default function QuizQuestions(){
    
    var distanceRadiusMeters;
    var cuisineInput;
    var rating;
    
    const [price,setPrice] = useState(0);
    const [distance, setDistance] = useState(5);

    const doQuizQuery = async event =>{    
        distanceRadiusMeters = distance / 0.00062137; 
    }

    return(
        <div>
            <form>
                <label>What price range are you interested in?</label>
                <InputRange id="price" minValue={0} maxValue={4} value={price} onChange={(e) => setPrice(e.target.value)}></InputRange>
                <p id='priceValue'>{price}</p>
                <label for='distance'>What distance are you willing to drive</label>
                <InputRange id="distance" minValue={5} maxValue={30} value={distance} onChange={(e) => setDistance(e.target.value)}></InputRange>
                <p>{distance} miles</p>
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
    );
}
