import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import TextPage from './components/TextPage';
import Resources from './components/Resources';


class App extends Component {

    componentDidMount() {
        this.getData()
    }

    getData() {
        // create a new XMLHttpRequest
        const xhr = new XMLHttpRequest();

        console.log(xhr.responseText);

        // open the request with the verb and the url
        xhr.open('GET', 'http://127.0.0.1:8080/sid');

        // send the request
        xhr.send();

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == 4) {
                localStorage.setItem("sid", xhr.responseText);
            }
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Profile}/>
                        <Route exact path="/translator" component={TextPage}/>
                        <Route exact path="/resources" component={Resources}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;