import React, { Component } from 'react';
import './Styles.css'
class Navbar extends Component {
    state ={

    }

    render() {
        return (
            <div className="container">
                <h5>What Does Assertive Body Language Look Like?</h5>
                <div className="card underline darkYellow"></div>
                <p>When speaking with others in the workplace</p>
                    <li>Look the other person in the eye</li>
                    <li>Hold your body upright (do not slouch or shrink away)</li>
                    <li>Consciously relax your shoulders if tensed</li>
                    <li>Avoid yelling or whispering</li>
                    
                    <h5>What is being assertive?</h5>
                    <div className="card underline darkYellow"></div>
                    <p>Being assertive means communicating your ideas and needs firmly and concretely. 
                    Assertive language is not apologetic, nor does it disregard the contributions of others. 
                    Being assertive is about using words and body language to acknowledge the people around you while ensuring your own voice is heard.
                </p>
            </div>
        )
    }
}

export default Navbar;