import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import './Styles.css'

class TextPage extends Component {
    state ={
        entry: "",
        data: {},
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

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
                this.state.data = xhr.responseText;
                console.log(xhr.responseText);
            }
        }
    }

    render() {
        return(
            <div className="container row">
                <div className="card col s6 deep-purple lighten-4">
                <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="component-simple">Input</InputLabel>
                        <Input id="component-simple" value={this.state.entry} onChange={this.onChange} onSubmit={this.onSubmit}/>
                    </FormControl>                
                </form>
                <a className="waves-effect btn deep-purple lighten-2 waves-light" onClick={this.onSubmit}>Analyze</a>
                </div>
                <div className="col s6">
                <p>
                    OUTPUT
                </p>
                </div>
            </div>
        )
    }
}

export default TextPage;