import React, { useState } from 'react';

export default function QuizQuestions() {

    var distanceRadiusMeters;
    var distanceRadiusMiles;
    var cuisineInput;
    var rating;
    var price;

    const doQuizQuery = async event => {
        distanceRadiusMeters = distanceRadiusMiles / 0.00062137;
    }

    return (
        <div id="questionsDiv">
            <form>
                <div id="q1">
                    <div><label for='price'>What price range are you interested in?</label></div>
                    <div><select id='price' ref={(c) => price = c}>
                        <option value='1'>$</option>
                        <option value='2'>$$</option>
                        <option value='3'>$$$</option>
                        <option value='4'>$$$$</option>
                    </select></div>
                </div>

                <div id="q2">
                    <div><label for='distance'>What distance are you willing to drive</label></div>
                    <div><input id='distance' type='number' min={0} max={50} step={5} ref={(c) => distanceRadiusMiles = c}></input> miles</div>
                </div>

                <div id="q3">
                    <div><label for='cuisine'>Please provide what food you are "In-The-Mood" for:</label></div>
                    <div><input id='cuisine' type="text" placeholder='Ex. "American", "Burgers", "Pasta", etc.' ref={(c) => cuisineInput = c}></input></div>
                </div>

                <div id="q4">
                <div><label for='rating'>Provide a preferred rating:</label></div>
                    <div><select id='rating' ref={(c) => rating = c}>
                        <option value='2'>2.0 and up</option>
                        <option value='2.5'>2.5 and up</option>
                        <option value='3'>3.0 and up</option>
                        <option value='3.5'>3.5 and up</option>
                        <option value='4'>4 and up</option>
                        <option value='4.5'>4.5 and up</option>
                        <option value='5'>5.0 and up</option>
                    </select></div>
                </div>
                <button id='QuizSearch' onClick={doQuizQuery}>Search</button>
            </form>
        </div>
    );
}
