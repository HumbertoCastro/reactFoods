import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Food from './pages/Food';
import Login from './pages/Login';
import PaginaInicial from './pages/PaginaInicial';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/home" component={ PaginaInicial } />
        <Route path="/food/:foodId" component={ Food } />
      </Switch>
    );
  }
}

export default App;
