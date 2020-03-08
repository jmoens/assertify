import React, {Component} from 'react';
import './Styles.css'

class Navbar extends Component {
    state = {}

    render() {
        return (
            <div className="container">
                <h5>What is being assertive?</h5>
                <div className="resourceField">
                    <div className="card underline darkYellow"></div>
                    <p>Being assertive means communicating your ideas and needs firmly and concretely.
                        Assertive language is not apologetic, nor does it disregard the contributions of others.
                        Being assertive is about using words and body language to acknowledge the people around you
                        while
                        ensuring your own voice is heard.
                    </p>
                </div>

                <h5>Assertiveness and your mental health</h5>
                <div className="resourceField">
                    <div className="card underline darkYellow"></div>
                    <p>Being passive gives the impression that your thoughts and feelings aren't as important as others,
                        and for women, people of minority, and individuals struggling with mental health issues, these
                        thoughts and feelings should definitely be voiced.
                    </p>
                </div>

                <h5>What does assertive body language look like?</h5>
                <div className="card underline darkYellow"></div>
                <p>This tool is designed to help communicate with confidence over email or messenger. Here are a few
                    addition tips for effective in person communication:</p>
                <div className="bullets">
                    <li>Look the other person in the eye</li>
                    <li>Hold your body upright (do not slouch or shrink away)</li>
                    <li>Consciously relax your shoulders if tensed</li>
                    <li>Avoid yelling or whispering</li>
                </div>
            </div>
        )
    }
}

export default Navbar;