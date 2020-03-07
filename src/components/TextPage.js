import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
class TextPage extends Component {
    state ={
        entry: ""
    }

    onChange = (e) => {
        this.setState({
            entry: e.target.value
        }, () => console.log(this.state))
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("Submits")
    }

    render() {
        return(
            <div className="container">
                TextPage
                <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="component-simple">Name</InputLabel>
                        <Input id="component-simple" value={this.state.entry} onChange={this.onChange} onSubmit={this.onSubmit}/>
                    </FormControl>                
                </form>
            </div>
        )
    }
}

export default TextPage;