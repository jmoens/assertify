import React, {Component} from 'react';
import './Styles.css'
import Highlighter from 'react-highlight-words';
import {Tooltip} from "@material-ui/core";

class TextPage extends Component {
    state = {
        entry: "",
        previousEntry: "",
        highlightingInfo: {},
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
        let text = this.state.entry
        this.setState({
            previousEntry: text,
        }, () => this.beginAnalysis())
        // this.beginAnalysis();
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
            console.log("ready state", xhr.readyState)
            if (xhr.readyState === 4) {
                console.log("RES", xhr.responseText)
                that.stateSetter(JSON.parse(xhr.responseText));
                // that.setSearchTerms();
            }
        }
    }

    stateSetter(str) {
        this.setState({
            analysisResults: str
        }, () => this.setSearchTerms())
    };

    setSearchTerms() {
        let highlightInfo = {};
        let analysisLength = this.state.analysisResults.length - 1;
        this.state.analysisResults[analysisLength]['comments'].forEach(elem => {
                highlightInfo[this.state.previousEntry.slice(elem.start, elem.end)] = elem.suggestion;
            }
        )
        this.setState({
            highlightingInfo: highlightInfo,
        })
    }

    Highlight = ({children, highlightIndex}) => (
        <Tooltip title={this.state.highlightingInfo[children]}>
            <mark className="highlighted-text">{children}</mark>
        </Tooltip>
    );

    render() {
        // let output = <div/>;
        let counts = <div/>;
        let moodData = []
        let analysisLength = this.state.analysisResults.length > 0 ? this.state.analysisResults.length - 1 : 0;
        if (this.state.analysisResults[analysisLength] && this.state.analysisResults[analysisLength]['tone']) {
            this.state.analysisResults[analysisLength]['tone'].forEach(result => {
                if (result.score >= 0.5) {
                    moodData.push(<div className="bold" key={moodData.length}>{result.tone_name}</div>)
                }
            })
        }

        if (this.state.analysisResults[analysisLength] && this.state.analysisResults[analysisLength].counts) {
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
        } else {
            counts = <div/>
        }
        let toneAnalysis = moodData.length > 0 ? <div><span className="bold underline">Analysis:</span><div>{moodData}</div></div> :  <div/>
        return (
            <div className="container">
                <div className="row">
                    <div className="card col test noborder">
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
                    <div className="card col test border">
                        <Highlighter
                            highlightTag={this.Highlight}
                            highlightStyle={{fontWeight: 'normal'}}
                            searchWords={Object.keys(this.state.highlightingInfo)}
                            textToHighlight={this.state.previousEntry}
                        />
                    </div>
                </div>
                <div>
                    {counts}
                </div>
                {toneAnalysis}
            </div>
        )
    }
}

export default TextPage;