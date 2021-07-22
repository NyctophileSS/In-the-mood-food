import React, {useState} from 'react';



export default class QuizQuestions extends React.Component {
    
    distanceRadiusMeters
    cuisineInput
    rating
    
    

    doQuizQuery = async event =>{
        
        distanceRadiusMeters = distanceRadiusMiles.value / 0.00062137; 
    }

    price = {
        value: 0
    }
    distanceRadiusMiles = {
        value: 5
    }

    handleOnChangePrice = (e) => this.setPrice({value: e.target.value})
    handleOnChangeDistance = (e) => this.setPrice({ value: e.target.value })

    render() {
        return(
        <div>
            <form>
                <label>What price range are you interested in?</label>
                <input id='price' type="range" min={0} max={4} value={this.price.value} step={1} onChange={this.handleOnChangePrice}></input>
                <p id='priceValue'>{this.price.value}</p>
                <label for='distance'>What distance are you willing to drive</label>
                <input id='distance' type="range" min={5} max={30} value={this.distanceRadiusMiles.value} step={5} onChange={this.handleOnChangeDistance}></input>
                <p>{this.distanceRadiusMiles.value} miles</p>
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
    } 
}
