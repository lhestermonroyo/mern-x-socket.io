import React, { Component } from 'react';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;