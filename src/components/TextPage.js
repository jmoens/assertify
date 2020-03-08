import React, {Component} from 'react';
import './Styles.css'
import Highlighter from 'react-highlight-words';

class TextPage extends Component {
    state = {
        entry: "",
        previousEntry: "",
        analysisResults: [{
            'comments': [],
            'counts': {},
            'tone': []
        }]
    }

    onChange = (e) => {
        this.setState({
            entry: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            previousEntry: this.state.entry
        })
        this.beginAnalysis();
    }

    beginAnalysis() {

        const xhr = new XMLHttpRequest();

        const url = "http://127.0.0.1:8080/" + localStorage.getItem("sid");

        xhr.open('PUT', url);

        xhr.send(this.state.entry);

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
                this.getAnalysisResults();
            }
        }
    }

    getAnalysisResults() {

        const xhr = new XMLHttpRequest();

        const url = "http://127.0.0.1:8080/res/" + localStorage.getItem("sid");

        xhr.open('GET', url);

        xhr.send();

        let that = this;

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
                that.stateSetter(JSON.parse(xhr.responseText));
            }
        }
    }

    stateSetter(str) {
        this.setState({
            analysisResults: str
        })
    };

    render() {
        let output = <div/>;
        let counts = <div/>;
        let moodData = []
        let moods = ["frustrated", "sad", "satisfied", "excited", "polite", "impolite", "sympathetic"]
        let analysisLength = this.state.analysisResults.length - 1;
        if (this.state.analysisResults[analysisLength]['tone']) {
            this.state.analysisResults[analysisLength]['tone'].forEach(result => {
                if (result.score >= 0.5) {
                    moodData.push(<div className="bold" key={moodData.length}>{result.tone_name}</div>)
                }
            })
        }

        if (this.state.analysisResults[analysisLength].counts) {
            let lines = [];

            Object.entries(this.state.analysisResults[analysisLength].counts).forEach((k, v) => {
                let time = k[1].count > 1 ? "times" : "time"
                lines.push(<p key={lines.length}>You have used the word <span className="red-text">{k[0]}</span> <span
                    className="bold">{k[1].count}</span> {time}. {k[1].response}</p>)
            })
            counts = (
                <div>
                    {lines}
                </div>)
        }
        if (this.state.analysisResults) {
            let comments = []
            if (this.state.analysisResults[analysisLength]['comments']) {
                this.state.analysisResults[analysisLength]['comments'].forEach(elem => {
                    comments.push(<p key={comments.length}>{elem.suggestion}</p>)
                })
            }
            output = (
                <div>
                    Comments: {comments}
                </div>)
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="card col s6 noborder">
                        <textarea
                            className="textarea textboxYellow"
                            name='searchTerms'
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                        />
                        <div className="center-align">
                            <a className="waves-effect btn darkYellow lighten-2 waves-light"
                               onClick={this.onSubmit}>Analyze</a>
                        </div>
                    </div>
                    <div className="card col s6">
                        <Highlighter
                            highlightStyle={{fontWeight: 'normal'}}
                            searchWords={["the", "where", "think", "sorry"]}
                            textToHighlight={this.state.previousEntry}
                        />
                    </div>
                </div>
                <div>
                    {counts}
                </div>
                <div className="bold underline">
                    Analysis:
                </div>
                {moodData}
            </div>
        )
    }
}

export default TextPage;