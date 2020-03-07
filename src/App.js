import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import TextPage from './components/TextPage';
import Resources from './components/Resources';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Profile}/>
          <Route exact path="/translator" component={TextPage}/>
          <Route exact path="/resources" component={Resources} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;