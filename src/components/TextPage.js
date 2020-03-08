import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import './Styles.css'

class TextPage extends Component {
    state ={
        entry: ""
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
        return(
            <div className="container row">
                <div className="card col s6 darkYellow lighten-4">
                <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="component-simple">Input</InputLabel>
                        <Input id="component-simple" value={this.state.entry} onChange={this.onChange} onSubmit={this.onSubmit}/>
                    </FormControl>                
                </form>
                <a className="waves-effect btn darkYellow lighten-2 waves-light" onClick={this.onSubmit}>Analyze</a>
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