import React, { Component } from 'react';
import './Styles.css'

class TextPage extends Component {
    state ={
        entry: "",
        output:{
            'comments': [
                {
                    'end': 54, 
                    'start': 47, 
                    'suggestion': 'Consider removing this.'},
                {
                    'end': 66,
                    'start': 55,
                    'suggestion': "Consider removing the word 'just'."
                },
                {
                    'end': 33,
                    'start': 22,
                    'suggestion': 'Consider removing this.'
                }
            ],
            'counts': {
                'just': {
                    'count': 3,
                    'response': 'This word comes across as passive or apologetic. Consider removing it.'
                        },
                'please': {'count': 1,
                    'response': 'Using this word too often makes requests ' +
                        'come across as optional. Be polite, but ' +
                        'ask yourself whether you are requesting a ' +
                        'favour or a work task.'
                    },
                'sorry': {
                    'count': 2,
                    'response': 'Check whether these are really things that ' +
                                'you need to apologize for.'
                },
                'think': {'count': 2,
                            'response': 'Are you confident in your ideas? If so ' +
                                        'removing or replacing with alternatives ' +
                                        "such as 'know', or 'am confident'."}},
            'tone': [
                {
                    'score': 0.639146, 
                    'tone_id': 'polite', 
                    'tone_name': 'Polite'},
                {
                    'score': 0.80092,
                    'tone_id': 'sympathetic',
                    'tone_name': 'Sympathetic'
                }
            ]
        }
    }

    onChange = (e) => {
        this.setState({
            entry: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // this.state.entry has the text input
        console.log(this.state.entry)
    }

    render() {
        let output = <div />
        if(this.state.output) {
            let comments = []
            if(this.state.output['comments']) {
                this.state.output['comments'].forEach(elem =>{
                    comments.push(<p>{elem.suggestion}</p>)
                })
                console.log(comments)
            }
            output = (
            <div>
                Comments: {comments}
            </div>)
        }
        return(
            <div className="container row">
                <div className="card col s6 darkYellow lighten-4">
                    <textarea className="textarea" onChange={this.onChange} onSubmit={this.onSubmit} />
                <a className="waves-effect btn darkYellow lighten-2 waves-light" onClick={this.onSubmit}>Analyze</a>
                </div>
                <div className="col s6">
                <p>
                    {output}
                </p>
                </div>
            </div>
        )
    }
}

export default TextPage;