import React, {Component} from 'react';
import './Styles.css'

class TextPage extends Component {
    state = {
        entry: "",
        analysisResults: {
            'comments': [],
            'counts': {},
            'tone': []
        }
    }

    onChange = (e) => {
        this.setState({
            entry: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
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
        let temp;

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
        // let analysisLength = state.analysisResults.length - 1;
        if (this.state.analysisResults.counts) {
            let lines = [];

            Object.entries(this.state.analysisResults.counts).forEach((k, v) => {
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
            if (this.state.analysisResults['comments']) {
                this.state.analysisResults['comments'].forEach(elem => {
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
                        <textarea className="textarea textboxYellow" onChange={this.onChange} onSubmit={this.onSubmit}/>
                        <a className="waves-effect btn darkYellow lighten-2 waves-light"
                           onClick={this.onSubmit}>Analyze</a>
                    </div>
                </div>
                <div>
                    {counts}
                </div>
            </div>
        )
    }
}

export default TextPage;