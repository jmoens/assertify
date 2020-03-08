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
        let analysisLength = this.state.analysisResults.length - 1;
        if (this.state.analysisResults[analysisLength].counts) {
            let lines = [];

            Object.entries(this.state.analysisResults[analysisLength].counts).forEach((k, v) => {
                let text = "You have used the word " + k[0] + " " + k[1].count + " times. " + k[1].response;
                lines.push(<p key={lines.length}>{text}</p>)
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
            <div>
                <div className="container">
                    <div className="card col noborder">
                        <textarea
                            className="textarea textboxYellow"
                            name='searchTerms'
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                        />
                        <textarea
                            className="textarea textboxYellow"
                            name='searchTerms'
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                        />
                        <a className="waves-effect btn darkYellow lighten-2 waves-light"
                           onClick={this.onSubmit}>Analyze</a>
                    </div>
                </div>
                <Highlighter
                    highlightStyle={{ fontWeight: 'normal' }}
                    searchWords={["the", "where", "think", "sorry"]}
                    textToHighlight={this.state.previousEntry}
                />
                <div>
                    {counts}
                </div>
            </div>
        )
    }
}

export default TextPage;